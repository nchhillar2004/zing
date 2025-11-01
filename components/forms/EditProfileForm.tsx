"use client";

import { useState } from "react";
import { UserWithCounts } from "@/interfaces/user";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { TriangleAlert } from "lucide-react";
import { Field, FieldDescription, FieldGroup } from "../ui/field";
import { maxDate } from "@/utils/time";

export default function EditProfileForm({ user }: { user: UserWithCounts }) {
    const [formData, setFormData] = useState({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        dob: user.dob || "",
        bio: user.bio || "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <FieldGroup>
                <Field>
                    <Label htmlFor="name">Full name</Label>
                    <Input
                        name="name"
                        placeholder="Enter full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </Field>
                <Field>
                    <Label htmlFor="username">Username</Label>
                    <Input
                        name="username"
                        placeholder="Enter username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </Field>
                <Field>
                    <Label htmlFor="email">
                        Email {!formData.email && <TriangleAlert className="inline ml-[2px] text-yellow-500" size={14} />}
                    </Label>
                    <Input
                        name="email"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </Field>
                <Field>
                    <Label htmlFor="dob">
                        DOB {!formData.dob && <TriangleAlert className="inline ml-[2px] text-yellow-500" size={14} />}
                    </Label>
                    <Input
                        name="dob"
                        type="date"
                        placeholder="Date of birth"
                        min={maxDate(80)}
                        max={maxDate(12)}
                        pattern="\d{2}-\d{2}-\d{4}"
                        value={formData.dob}
                        onChange={handleChange}
                    />
                    <FieldDescription>Ignore the DOB if this account represents a company or an organization</FieldDescription>
                </Field>
                <Field>
                    <Button type="submit">Save</Button>
                </Field>
            </FieldGroup>
        </form>
    );
}
