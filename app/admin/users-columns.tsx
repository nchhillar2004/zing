"use client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { UserWithCounts } from "@/interfaces/user"
import { UserRole, ModerationStatus } from "@prisma/client"
import { UserEditDialog } from "./user-edit-dialog"

export const createUsersColumns = (
    onUpdate: () => void
): ColumnDef<UserWithCounts>[] => [
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
        accessorKey: "username",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Username
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="font-medium">{row.getValue("username")}</div>
        ),
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <div>{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
            <div className="lowercase">{row.getValue("email") || "N/A"}</div>
        ),
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
            const role = row.getValue("role") as UserRole;
            return (
                <Badge variant={role === UserRole.ADMIN ? "default" : "secondary"}>
                    {role}
                </Badge>
            );
        },
    },
    {
        accessorKey: "moderationStatus",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("moderationStatus") as ModerationStatus;
            const variant = 
                status === ModerationStatus.BANNED ? "destructive" :
                status === ModerationStatus.TIMED_OUT ? "secondary" :
                "default";
            return (
                <Badge variant={variant}>
                    {status}
                </Badge>
            );
        },
    },
    {
        accessorKey: "isSpam",
        header: "Spam",
        cell: ({ row }) => {
            const isSpam = row.getValue("isSpam") as boolean;
            return (
                <Badge variant={isSpam ? "destructive" : "secondary"}>
                    {isSpam ? "Yes" : "No"}
                </Badge>
            );
        },
    },
    {
        accessorKey: "_count",
        header: "Stats",
        cell: ({ row }) => {
            const counts = row.getValue("_count") as { posts: number; followers: number; follows: number };
            return (
                <div className="text-sm text-muted-foreground">
                    {counts.posts} posts, {counts.followers} followers
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
            const user = row.original;
            return <UserEditDialog user={user} onUpdate={onUpdate} />;
        },
    },
];

