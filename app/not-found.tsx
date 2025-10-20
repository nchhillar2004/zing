import { H2, P } from "@/components/ui/typography";
import Link from "next/link";

export default function NotFound() {
    return(
    <div>
            <H2>Page Not Found</H2>
            <P>Could not find requested page.</P>
            <Link href={"/"}>Return Home</Link>
        </div>
    );
}
