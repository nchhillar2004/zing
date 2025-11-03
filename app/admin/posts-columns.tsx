"use client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { PostWithAuthor } from "@/types/post"
import { PostEditDialog } from "./post-edit-dialog"

export const createPostsColumns = (
    onUpdate: () => void
): ColumnDef<PostWithAuthor>[] => [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "content",
        header: "Content",
        cell: ({ row }) => {
            const content = row.getValue("content") as string;
            return (
                <div className="max-w-[300px] truncate">
                    {content}
                </div>
            );
        },
    },
    {
        accessorKey: "author",
        header: "Author",
        cell: ({ row }) => {
            const author = row.getValue("author") as { username: string; name: string };
            return (
                <div>
                    <div className="font-medium">{author.name}</div>
                    <div className="text-sm text-muted-foreground">@{author.username}</div>
                </div>
            );
        },
    },
    {
        accessorKey: "postType",
        header: "Type",
        cell: ({ row }) => {
            const type = row.getValue("postType") as string;
            return <Badge variant="secondary">{type}</Badge>;
        },
    },
    {
        accessorKey: "_count",
        header: "Stats",
        cell: ({ row }) => {
            const counts = row.getValue("_count") as {
                likes: number;
                views: number;
                replies: number;
                bookmarks: number;
            };
            return (
                <div className="text-sm text-muted-foreground">
                    ❤️ {counts.likes} 👁️ {counts.views} 💬 {counts.replies} 🔖 {counts.bookmarks}
                </div>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Created
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue("createdAt"));
            return <div className="text-sm">{date.toLocaleDateString()}</div>;
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const post = row.original;
            return <PostEditDialog post={post} onUpdate={onUpdate} />;
        },
    },
];

