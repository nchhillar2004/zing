"use client";
import { useEffect, useState, ChangeEvent } from "react";
import { Label } from "../ui/label";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { X, Download, FileText, Plus } from "lucide-react";
import { Muted } from "../ui/typography";
import Image from "next/image";

interface PreviewItem {
    url: string;
    type: string;
    name: string;
}

export default function AddFilesInPost() {
    const [previews, setPreviews] = useState<PreviewItem[]>([]);
    const MAX_FILES = 5;
    const SUPPORTED_FORMATS = ".png, .jpg, .jpeg, .mp4, .pdf";

    useEffect(() => {
        return () => {
            previews.forEach((preview) => URL.revokeObjectURL(preview.url));
        };
    }, [previews]);

    const removePreview = (indexToRemove: number) => {
        setPreviews((prev) => {
            const newPreviews = prev.filter((_, index) => index !== indexToRemove);
            URL.revokeObjectURL(prev[indexToRemove].url);
            return newPreviews;
        });
    };

    const handleDownload = (url: string, name: string) => {
        const link = document.createElement("a");
        link.href = url;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files){
            setPreviews([]);
            return;
        }

        const currentCount = previews.length;
        const availableSlots = MAX_FILES - currentCount;
        if (files.length > availableSlots) {
            console.warn(`Only ${availableSlots} slots left. Adding ${availableSlots} files.`);
        }

        const newFiles = Array.from(files).slice(0, availableSlots);
        const newPreviews: PreviewItem[] = newFiles.map((file) => ({
            url: URL.createObjectURL(file),
            type: file.type,
            name: file.name,
        }));
        setPreviews((prev) => [...prev, ...newPreviews]);
    };

    return (
        <div
            onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
            }}
        >
            <Card className="p-0 border-none gap-0 max-sm:max-w-[320px] max-sm:overflow-hidden">
                {previews.length > 0 && (
                    <div className="flex flex-wrap gap-2 my-2">
                        {previews.map(({ url, type, name }, i) => (
                            <div key={i} className="relative w-40 h-40 group">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 bg-background border shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {e.preventDefault(); removePreview(i)}}
                                >
                                    <X className="h-3 w-3" />
                                </Button>

                                {type.startsWith("video/") ? (
                                    <video
                                        src={url}
                                        controls
                                        className="w-full h-full rounded-md object-cover"
                                    />
                                ) : type.startsWith("image/") ? (
                                        <Image
                                            src={url}
                                            alt={`preview-${i}`}
                                            width={500}
                                            height={500}
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    ) : type === "application/pdf" ? (
                                            <div className="w-full h-full bg-muted rounded-md flex flex-col items-center justify-center p-2">
                                                <FileText className="h-8 w-8 mb-1 text-muted-foreground" />
                                                <p className="text-xs text-center truncate max-w-[120px] mb-2">{name}</p>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDownload(url, name);
                                                    }}
                                                    className="h-6 px-2 text-xs"
                                                >
                                                    <Download className="h-3 w-3 mr-1" />
                                                    Download
                                                </Button>
                                            </div>
                                        ) : null}
                            </div>
                        ))}
                        {previews.length < 5 &&
                            <div title="Add file" className="h-40 w-40 cursor-pointer hover:text-foreground text-foreground/75 rounded-md border-[2px] border-dotted border-muted flex items-center justify-center">
                                <Plus size={24} />
                            </div>}
                    </div>
                )}
                <CardContent className="p-4 rounded-md border border-border">
                    <Label htmlFor="fileUpload" className="text-[16px]">Upload files</Label>
                    <Muted className="text-sm">Supported formats: {SUPPORTED_FORMATS}</Muted>
                    <Input
                        type="file"
                        accept={SUPPORTED_FORMATS}
                        name="fileUpload"
                        onChange={handleFileChange}
                        className="my-2"
                        multiple
                        required
                    />
                    {previews.length > 0 && (
                        <p className="text-xs text-muted-foreground">
                            {previews.length}/{MAX_FILES} files selected
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
