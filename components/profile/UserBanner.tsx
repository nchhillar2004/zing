import { P } from "../ui/typography";
import { Small } from "../ui/typography";

export default function UserBanner() {
    return(
        <div className="relative h-32 bg-primary/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/10" />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-primary/60 select-none">
                    <P className="text-lg font-medium">Profile Banner</P>
                    <Small className="text-primary/40">No banner image set</Small>
                </div>
            </div>
        </div>
    );
}
