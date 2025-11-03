import { AdminTables } from "./admin-tables"

export default function AdminPage() {
    return (
        <div className="py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground mt-2">
                    Manage users, posts, and tags
                </p>
            </div>
            <AdminTables />
        </div>
    )
}

