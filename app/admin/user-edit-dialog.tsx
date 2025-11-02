"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { UserWithCounts } from "@/interfaces/user"
import { UserRole, ModerationStatus } from "@prisma/client"
import {
    updateUserModeration,
    updateUserRole,
    updateUserSpamStatus,
} from "@/lib/admin/adminActions"
import { toast } from "sonner"
import { MoreHorizontal } from "lucide-react"

export function UserEditDialog({
    user,
    onUpdate,
}: {
    user: UserWithCounts
    onUpdate: () => void
}) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [moderationStatus, setModerationStatus] = useState<ModerationStatus>(
        (user.moderationStatus as ModerationStatus) || ModerationStatus.ACTIVE
    )
    const [role, setRole] = useState<UserRole>(user.role || UserRole.USER)
    const [isSpam, setIsSpam] = useState(user.isSpam || false)
    const [reason, setReason] = useState("")

    const handleSave = async () => {
        setLoading(true)
        try {
            if (moderationStatus !== user.moderationStatus) {
                const result = await updateUserModeration(
                    user.id,
                    moderationStatus,
                    reason || undefined
                )
                if (!result.success) {
                    toast.error(result.error || "Failed to update moderation")
                    setLoading(false)
                    return
                }
            }
            if (role !== user.role) {
                const result = await updateUserRole(user.id, role)
                if (!result.success) {
                    toast.error(result.error || "Failed to update role")
                    setLoading(false)
                    return
                }
            }
            if (isSpam !== user.isSpam) {
                const result = await updateUserSpamStatus(user.id, isSpam)
                if (!result.success) {
                    toast.error(result.error || "Failed to update spam status")
                    setLoading(false)
                    return
                }
            }
            toast.success("User updated successfully")
            setOpen(false)
            onUpdate()
        } catch {
            toast.error("An error occurred")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Edit User: {user.username}</DialogTitle>
                    <DialogDescription>
                        Update user moderation status, role, and spam status.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="moderationStatus">Moderation Status</Label>
                        <Select
                            value={moderationStatus}
                            onValueChange={(value: string) =>
                                setModerationStatus(value as ModerationStatus)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={ModerationStatus.ACTIVE}>
                                    Active
                                </SelectItem>
                                <SelectItem value={ModerationStatus.TIMED_OUT}>
                                    Timed Out
                                </SelectItem>
                                <SelectItem value={ModerationStatus.BANNED}>
                                    Banned
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="reason">Reason</Label>
                        <Textarea
                            id="reason"
                            placeholder="Reason for moderation action"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="role">Role</Label>
                        <Select
                            value={role}
                            onValueChange={(value) => setRole(value as UserRole)}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={UserRole.USER}>User</SelectItem>
                                <SelectItem value={UserRole.MOD}>Moderator</SelectItem>
                                <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="isSpam">Spam Status</Label>
                        <Select
                            value={isSpam ? "true" : "false"}
                            onValueChange={(value) => setIsSpam(value === "true")}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="false">Not Spam</SelectItem>
                                <SelectItem value="true">Spam</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={loading}>
                        {loading ? "Saving..." : "Save Changes"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

