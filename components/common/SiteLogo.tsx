import Link from "next/link";
import { AiFillThunderbolt } from "react-icons/ai";

export default function SiteLogo({className}: {className?: string}) {
    return(
        <Link href={"/"} 
            className={`hover:no-underline! flex px-4 items-center text-2xl ${className}`} 
            title="Zing">
            <AiFillThunderbolt color="var(--primary)"/><strong>ING</strong>
        </Link>
    );
}
