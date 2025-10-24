import { getCurrentUser } from "@/lib/dal";
import prisma from "@/lib/db";
import { PostOrReply } from "@/types/post";
import { getCurrentTime } from "@/utils/time";

export async function updatePostView(post: PostOrReply) {
    const currentUser = await getCurrentUser();

    await prisma.post.update({
        where: {
            id: post.id
        },
        data: {
            viewCount: post.viewCount+1
        }
    });

    if (!currentUser){
        return { success: true, message: "login to add a valid view"};
    }

    try {
        await prisma.postView.upsert({
            where: {
                viewerId_postId: { viewerId: currentUser.id, postId: post.id }
            },
            update: {
                lastViewedAt: getCurrentTime(),
            },
            create: {
                viewerId: currentUser.id,
                postId: post.id
            }
        });
        return { success: true, message: "updated post valid view" }
    } catch(err) {
        return {success: false, error: err};
    }
}
