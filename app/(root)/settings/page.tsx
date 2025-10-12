import Header from "@/components/Header";
import ThemeToggle from "@/components/ThemeToggle";

export default function SettingsPage() {
    return(
        <>
            <Header variant="title" title="Settings" />
            <div className="p-4">
                <ThemeToggle/>
            </div>
        </>
    );
}


