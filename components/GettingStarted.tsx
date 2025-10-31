"use client";

import { useActionState, useEffect, useState } from "react";
import { UserWithCounts } from "@/interfaces/user";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { H3, P } from "@/components/ui/typography";
import { categories } from "@/lib/const";
import { categoriesAction } from "@/actions/categories";

export default function GettingStarted({ currentUser }: { currentUser: UserWithCounts }) {
    const [selected, setSelected] = useState<string[]>([]);
    const [disable, setDisable] = useState(false);
    const [state, action, pending] = useActionState(categoriesAction, undefined);

    useEffect(() => {
        if (selected.length>=8) {
            setDisable(true);
        }else {
            setDisable(false);
        }
    }, [selected.length]);

    const toggleCategory = (category: string) => {
        if (selected.includes(category)) {
            setSelected(selected.filter((c) => c !== category));
        } else {
            if (selected.length < 8) {
                setSelected([...selected, category]);
            } else {
                setDisable(true);
            }
        }
    };

    if (currentUser.selectedCategories?.length !== 0) return null;

    return (
        <div className="fixed bg-dark-background/50 flex items-center justify-center top-0 left-0 z-50 w-screen h-screen m-auto">
            {!pending && <div className="py-4 px-6 max-sm:w-screen max-sm:h-screen max-sm:overflow-scroll bg-dark-background border border-border rounded-[var(--space)]">
                <H3>Getting started</H3>
                <P className="mt-2 mb-4">Select at least 4 and at most 8 categories you are interested in.</P>
                <form action={action}>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-lg">
                        {categories.map((c, index) => (
                            <Label
                                key={index}
                                htmlFor={c.category}
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <Checkbox
                                    disabled={!(selected.includes(c.category)) && disable}
                                    id={c.category}
                                    name="categories"
                                    checked={selected.includes(c.category)}
                                    value={c.category}
                                    onCheckedChange={() => toggleCategory(c.category)}
                                />
                                <p>{c.name}</p>
                            </Label>
                        ))}
                    </div>
                    <input type="hidden" name="id" value={currentUser.id} />
                    <span className="text-red-500">{state?.error}</span>
                    <div className="w-full text-right">
                        <Button
                            className="mt-4 text-right"
                            type="submit"
                            disabled={selected.length < 4}
                        >
                            Continue ({selected.length}/8)
                        </Button>
                    </div>
                </form>
            </div>
            }
        </div>
    );
}

