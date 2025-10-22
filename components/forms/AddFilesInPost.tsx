"use client";
import { useEffect, useState, ChangeEvent } from "react";
import { Label } from "../ui/label";
import { Card, CardContent, } from "../ui/card";
import { Input } from "../ui/input";

export default function AddFilesInPost() {
    const [previews, setPreviews] = useState<string[]>([]);
    const MAX_FILES = 5;

    useEffect(() => {
        return () => {
            previews.forEach((url) => URL.revokeObjectURL(url));
        }
    }, [previews]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        if (files.length > MAX_FILES) return;

        const urls = Array.from(files).map((file) => URL.createObjectURL(file));
        setPreviews(urls);
    };

    return(
        <div
            onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
            }}
        >
            <Card className="p-0 border-none gap-0 max-sm:max-w-[320px] max-sm:overflow-hidden">
                {previews.length>0 && 
                    <div className="flex flex-wrap gap-2 my-2">
                        {previews.map((src, i) => {
                            if (src.match(/\.(mp4)&/)) {
                                return (
                                    <video key={i} src={src}  controls/>
                                );
                            } else if (src.match(/\.(pdf)$/)) {
                                return (
                                    <iframe key={i} src={src} className="w-40 h-40 border rounded-md" />
                                );
                            } else {
                                return (
                                    <img key={i} src={src} alt={`preview-${i}`} className="w-40 h-40 object-cover rounded-md" />
                                );
                            }
                        })}
                    </div>
                }
                <CardContent className="p-4 rounded-t-md border border-border space-y-2">
                    <Label htmlFor="fileUpload">Upload files</Label>
                    <Input 
                        type="file" 
                        accept=".png, .jpg, .jpeg, .mp4, .pdf" 
                        onChange={handleFileChange}
                        multiple 
                        required/>
                </CardContent>
            </Card>
        </div>
    );
}
