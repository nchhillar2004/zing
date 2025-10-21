"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Muted, P } from "../ui/typography";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Label } from "../ui/label";
import { formatISO, getPollEndTime } from "@/utils/time";

export interface PollLength {
    days: number;
    hours: number;
    minutes: number;
    slug: string;
}

export interface PollValue {
    option1: string;
    option2: string;
    option3?: string;
    option4?: string;
    pollLength: PollLength;
}

interface CreatePollInterface {
    setPollValue: (arg0: PollValue) => void;
    setPoll: (arg0: boolean) => void;
}

export default function CreatePoll({setPoll, setPollValue}: CreatePollInterface) {
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");
    const [option4, setOption4] = useState("");
    const [pollLength, setPollLength] = useState<PollLength | null>(null);
    const [customLength, setCustomLength] = useState<PollLength>({
        days: 0,
        hours: 0,
        minutes: 0,
        slug: "custom"
    });
    const [endTime, setEndTime] = useState<string>();
    const MAX_POLL_CHARACTERS = 25;

    const fastAutoFill = [
        { length: { days: 0, hours: 1, minutes: 0, slug: "1H" }, title: "1 Hour" },
        { length: { days: 0, hours: 6, minutes: 0, slug: "6H" }, title: "6 Hours" },
        { length: { days: 2, hours: 0, minutes: 0, slug: "2D" }, title: "2 Days" },
        { length: { days: 6, hours: 23, minutes: 60, slug: "7D" }, title: "7 Days" },
    ];

    useEffect(() => {
        if (pollLength) {
            setPollValue({
                option1,
                option2,
                option3,
                option4,
                pollLength,
            });
        }
    }, [option1, option2, option3, option4, pollLength, setPollValue]);

    useEffect(() => {
        const time = getPollEndTime(pollLength);
        if (time) {
            setEndTime(formatISO(time.toISOString()));
        }
    }, [pollLength]);

    const handleFastAutoFillChange = (length: PollLength) => {
        if (pollLength?.slug === length.slug) {
            setPollLength(null);
        } else {
            setPollLength(length);
            setCustomLength({ days: 0, hours: 0, minutes: 0, slug: "custom" });
        }
    };

    const handleManualChange = (type: "days" | "hours" | "minutes", value: string) => {
        const num = parseInt(value);
        const updated = { ...customLength, [type]: num };
        setCustomLength(updated);
        setPollLength({
            days: updated.days,
            hours: updated.hours,
            minutes: updated.minutes,
            slug: "custom",
        });
    };

    return (
        <div
            onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
            }}
        >
            <Card className="p-0 border-none gap-0 max-sm:max-w-[320px] max-sm:overflow-hidden">
                <CardContent className="p-4 rounded-t-md border border-border space-y-2">
                    <Input type="text" placeholder="Option 1" className="!text-lg py-2" maxLength={MAX_POLL_CHARACTERS}
                        value={option1}
                        onChange={(e) => setOption1(e.target.value)}
                        required />
                    <Input type="text" placeholder="Option 2" className="!text-lg py-2" maxLength={MAX_POLL_CHARACTERS}
                        value={option2}
                        onChange={(e) => setOption2(e.target.value)}
                        required />
                    <Input type="text" placeholder="Option 3 (Optional)" className="!text-lg py-2" maxLength={MAX_POLL_CHARACTERS}
                        value={option3}
                        onChange={(e) => setOption3(e.target.value)}
                    />
                    <Input type="text" placeholder="Option 4 (Optional)" className="!text-lg py-2" maxLength={MAX_POLL_CHARACTERS}
                        value={option4}
                        onChange={(e) => setOption4(e.target.value)}
                    />
                </CardContent>

                <CardContent className="py-2 px-4 border-x border-border space-y-2 max-sm:overflow-x-scroll">
                    {/* Fast Auto Fill */}
                    <div className="flex items-center space-x-2">
                        <P>Poll length</P>
                        {fastAutoFill.map((item) => (
                            <Label
                                key={item.length.slug}
                                htmlFor={item.length.slug}
                                className={`py-[2px] gap-0! px-2 text-sm border border-border rounded-sm cursor-pointer bg-primary/10 hover:bg-primary/20 transition-colors 
${pollLength?.slug === item.length.slug ? "border-primary bg-primary/30" : ""}`}
                                title={item.title}
                            >
                                <Checkbox
                                    required={!pollLength}
                                    id={item.length.slug}
                                    name={item.length.slug}
                                    checked={pollLength?.slug === item.length.slug}
                                    onCheckedChange={() => handleFastAutoFillChange(item.length)}
                                />
                                <p>{item.length.slug}</p>
                            </Label>
                        ))}
                    </div>

                    <div className="flex space-x-2">
                        {/* Days */}
                        <Select
                            value={String(customLength.days)}
                            onValueChange={(value) => handleManualChange("days", value)}
                        >
                            <SelectTrigger className="!p-4">
                                <SelectValue placeholder="Select" />
                                <Muted className="relative">Days</Muted>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Days</SelectLabel>
                                    {Array.from({ length: 7 }, (_, i) => (
                                        <SelectItem key={i} value={String(i)}>
                                            {i}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        {/* Hours */}
                        <Select
                            value={String(customLength.hours)}
                            onValueChange={(value) => handleManualChange("hours", value)}
                        >
                            <SelectTrigger className="!p-4">
                                <SelectValue placeholder="Select" />
                                <Muted className="relative">Hours</Muted>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Hours</SelectLabel>
                                    {Array.from({ length: 24 }, (_, i) => (
                                        <SelectItem key={i} value={String(i)}>
                                            {i}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        {/* Minutes */}
                        <Select
                            value={String(customLength.minutes)}
                            onValueChange={(value) => handleManualChange("minutes", value)}
                        >
                            <SelectTrigger className="!p-4">
                                <SelectValue placeholder="Select" />
                                <Muted className="relative">Minutes</Muted>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Minutes</SelectLabel>
                                    {Array.from({ length: 61 }, (_, i) => (
                                        <SelectItem key={i} value={String(i)}>
                                            {i}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    {pollLength && <Muted className="text-sm">
                        Poll will end in 
                        {pollLength.days>0 && <>{" "}{pollLength.days} days,</>} 
                        {" "} {pollLength.hours} hrs and 
                        {" "}{pollLength.minutes} minutes.
                        (i.e on {endTime})
                    </Muted>}
                </CardContent>

                <CardFooter className="p-0">
                    <Button
                        variant="ghost"
                        size="lg"
                        className="hover:bg-destructive/10 text-destructive rounded-b-md border border-border rounded-t-none w-full"
                        onClick={() => setPoll(false)}
                    >
                        Remove Poll
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

