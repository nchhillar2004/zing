// Data Transfer Object for User
// safeParse the user data before sending it to the client
import { User, UserRole } from "@prisma/client";
import "server-only";

export function isOwner(user: User, currentUser: User) {
    return user.id===currentUser.id;
}

export function isAdmin(user: User) {
    return user.role===UserRole.ADMIN;
}

export function canSeeEmailAddress(viewer: User) {
    return isAdmin(viewer);
}


