import { Menu } from "lucide-react";

export default function Header(){ 
    return (
        <header className="bg-background max-[600px]:px-[var(--space)] border-b min-w-[320px] border-border py-2 h-12 sticky z-20 top-0">
            <nav className="container flex h-full items-center justify-between">
                <div>
                    <Menu/>
                </div>
                <div>
                    login
                </div>
            </nav>
        </header>
    );
}
