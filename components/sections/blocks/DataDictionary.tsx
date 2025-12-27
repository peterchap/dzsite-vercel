"use client";

import React, { useState } from "react";
import Papa from "papaparse";
import { Container } from "@/components/ui/Container";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText, Loader2, Search } from "lucide-react";

type DataDictionaryProps = {
    buttonText?: string;
    title?: string;
    description?: string;
    csvFile?: {
        asset?: {
            _ref?: string;
            url?: string;
        };
    };
    isDark?: boolean;
};

// Simple helper if you don't have a configured robust asset URL resolver yet.
// Usually Sanity files are served from cdn.sanity.io/files/<projectId>/<dataset>/<filename>.<ext>
// But here, we expect the GROQ query to return `asset->{url}` ideally.
// If it returns only `_ref`, we might fail unless we construct the URL.
// Assuming for now the query will expand it or the user will update the query.

export default function DataDictionary({
    buttonText,
    title,
    description,
    csvFile,
    isDark,
}: DataDictionaryProps) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (open && data.length === 0 && !loading) {
            if (!csvFile?.asset?.url) {
                setError("No CSV file URL found. Please check Sanity query.");
                return;
            }
            setLoading(true);
            setError(null);

            Papa.parse(csvFile.asset.url, {
                download: true,
                header: true,
                skipEmptyLines: true,
                complete: (results: any) => {
                    setData(results.data);
                    setLoading(false);
                },
                error: (err: any) => {
                    console.error("CSV Parse Error", err);
                    setError("Failed to load CSV data.");
                    setLoading(false);
                },
            });
        }
    };

    // Filter logic
    const filteredData = data.filter((row) =>
        Object.values(row).some((val) =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const headers = data.length > 0 ? Object.keys(data[0]) : [];

    return (
        <section className={`py-12 ${isDark ? "bg-slate-50" : "bg-white"}`}>
            <Container>
                <div className="flex flex-col items-center justify-center text-center">
                    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
                        <DialogTrigger asChild>
                            <Button size="lg" className="gap-2">
                                <FileText className="h-4 w-4" />
                                {buttonText || "View Data Dictionary"}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-5xl max-h-[90vh] flex flex-col">
                            <DialogHeader>
                                <DialogTitle>{title || "Data Dictionary"}</DialogTitle>
                                {description && (
                                    <DialogDescription>{description}</DialogDescription>
                                )}
                            </DialogHeader>

                            <div className="my-4 flex items-center gap-2 border rounded-md px-3 py-2">
                                <Search className="h-4 w-4 text-gray-500" />
                                <input
                                    className="flex-1 bg-transparent text-sm outline-none"
                                    placeholder="Search dictionary..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className="flex-1 overflow-auto border rounded-md">
                                {loading ? (
                                    <div className="flex h-40 items-center justify-center">
                                        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                                    </div>
                                ) : error ? (
                                    <div className="flex h-40 items-center justify-center text-red-500">
                                        {error}
                                    </div>
                                ) : data.length > 0 ? (
                                    <Table>
                                        <TableHeader className="bg-slate-50 sticky top-0 z-10">
                                            <TableRow>
                                                {headers.map((h) => (
                                                    <TableHead key={h} className="font-bold text-slate-900">
                                                        {h}
                                                    </TableHead>
                                                ))}
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredData.length > 0 ? (
                                                filteredData.map((row, i) => (
                                                    <TableRow key={i}>
                                                        {headers.map((h) => (
                                                            <TableCell key={`${i}-${h}`}>{row[h]}</TableCell>
                                                        ))}
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={headers.length}
                                                        className="h-24 text-center"
                                                    >
                                                        No matching records found.
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                ) : (
                                    <div className="flex h-40 items-center justify-center text-slate-500">
                                        No data available.
                                    </div>
                                )}
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </Container>
        </section>
    );
}
