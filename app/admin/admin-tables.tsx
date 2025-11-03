"use client"
import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable } from "./data-table"
import { createUsersColumns } from "./users-columns"
import { createPostsColumns } from "./posts-columns"
import { createTagsColumns } from "./tags-columns"
import { TagWithCount } from "@/lib/admin/fetchAllTags"
import { UserWithCounts } from "@/types/user"
import { PostWithAuthor } from "@/types/post"
import { fetchAllUsers } from "@/lib/admin/fetchAllUsers"
import { fetchAllPosts } from "@/lib/admin/fetchAllPosts"
import { fetchAllTags } from "@/lib/admin/fetchAllTags"

export function AdminTables() {
    const [users, setUsers] = useState<UserWithCounts[]>([])
    const [posts, setPosts] = useState<PostWithAuthor[]>([])
    const [tags, setTags] = useState<TagWithCount[]>([])
    const [loading, setLoading] = useState(true)

    const loadData = async () => {
        setLoading(true)
        try {
            const [usersData, postsData, tagsData] = await Promise.all([
                fetchAllUsers(),
                fetchAllPosts(),
                fetchAllTags(),
            ])
            setUsers(usersData)
            setPosts(postsData.posts)
            setTags(tagsData)
        } catch (error) {
            console.error("Error loading admin data:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    const handleUpdate = () => {
        loadData()
    }

    if (loading) {
        return <div className="flex items-center justify-center p-8">Loading...</div>
    }

    return (
        <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="users">Users ({users.length})</TabsTrigger>
                <TabsTrigger value="posts">Posts ({posts.length})</TabsTrigger>
                <TabsTrigger value="tags">Tags ({tags.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="users" className="mt-4">
                <DataTable
                    columns={createUsersColumns(handleUpdate)}
                    data={users}
                    searchKey="username"
                    searchPlaceholder="Search users..."
                />
            </TabsContent>
            <TabsContent value="posts" className="mt-4">
                <DataTable
                    columns={createPostsColumns(handleUpdate)}
                    data={posts}
                    searchKey="content"
                    searchPlaceholder="Search posts..."
                />
            </TabsContent>
            <TabsContent value="tags" className="mt-4">
                <DataTable
                    columns={createTagsColumns(handleUpdate)}
                    data={tags}
                    searchKey="name"
                    searchPlaceholder="Search tags..."
                />
            </TabsContent>
        </Tabs>
    )
}

