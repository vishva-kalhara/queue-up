import { Card } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { IWaitlistDoc } from "@/types/waitlist-types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ArrowUpDown, Mail } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

type paginationType = {
    pageIndex: number;
    pageSize: number;
};

type props = {
    intitialWaitlistData: IWaitlistDoc[];
    isFetching: boolean;
    setPagination: Dispatch<SetStateAction<paginationType>>;
    pagination: paginationType;
    totalDocs: number;
    setSort: Dispatch<SetStateAction<"desc" | "asc">>;
    sort?: "desc" | "asc";
};

const WaitlistDataTable = ({
    intitialWaitlistData,
    isFetching,
    setPagination,
    totalDocs,
    pagination,
    setSort,
}: props) => {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = useState({});
    const [limitValue, setLimitValue] = useState<"15" | "50" | "999">("15");

    const columns: ColumnDef<IWaitlistDoc>[] = useMemo(
        () => [
            {
                id: "select",
                header: ({ table }) => (
                    <Checkbox
                        checked={
                            table.getIsAllPageRowsSelected() ||
                            (table.getIsSomePageRowsSelected() &&
                                "indeterminate")
                        }
                        onCheckedChange={(value) =>
                            table.toggleAllPageRowsSelected(!!value)
                        }
                        aria-label="Select all"
                    />
                ),
                cell: ({ row }) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                    />
                ),
                enableSorting: false,
                enableHiding: false,
            },
            {
                accessorKey: "createdAt",
                header: () => (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            setSort((prev) => (prev == "asc" ? "desc" : "asc"))
                        }
                    >
                        Joined At <ArrowUpDown className="ml-2 size-4" />
                    </Button>
                ),
                cell: ({ row }) => (
                    <span>
                        {new Date(row.getValue("createdAt")).toLocaleString()}
                    </span>
                ),
            },
            {
                accessorKey: "firstName",
                header: "First Name",
                cell: ({ row }) => (
                    <span>{row.getValue("firstName") || "-"}</span>
                ),
            },
            {
                accessorKey: "lastName",
                header: "Last Name",
                cell: ({ row }) => <span>{row.getValue("lastName")}</span>,
            },
            {
                accessorKey: "email",
                header: "Email",
                cell: ({ row }) => <span>{row.getValue("email")}</span>,
            },
        ],
        [setSort]
    );

    const table = useReactTable({
        data: intitialWaitlistData || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
        pageCount: Math.ceil(totalDocs / pagination.pageSize),
        onPaginationChange: setPagination,
        onRowSelectionChange: setRowSelection,
        state: {
            columnFilters,
            pagination,
            rowSelection,
        },
    });

    return (
        <div className="px-8 lg:px-0 py-10 lg:py-16  max-w-4xl mx-auto">
            <div className="flex justify-end w-full mb-4 gap-4">
                <div className="flex gap-2">
                    <Button
                        className="p-3"
                        onClick={() => {
                            if (Object.keys(rowSelection).length == 0) {
                                toast({
                                    variant: "destructive",
                                    title: "Select atleast a one user.",
                                });
                                return;
                            }
                            // const emailList: string[] = [];
                            let emails = "mailto:<";
                            Object.keys(rowSelection).map((i) => {
                                if (emails != "mailto:<") emails += ", ";
                                emails +=
                                    table.getRowModel().rows[Number(i)].original
                                        .email;
                            });
                            emails += ">";
                            window.location.href = emails;
                        }}
                        variant="ghost"
                    >
                        <Mail className="size-4" />
                        E-mail Now
                    </Button>
                </div>
            </div>
            <Card className="pb-2">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        className="text-center"
                                        key={header.id}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isFetching ? (
                            [...Array(5)].map((_, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {columns.map((_, cellIndex) => (
                                        <TableCell key={cellIndex}>
                                            <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : !table.getRowModel().rows.length ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center text-gray-500"
                                >
                                    No results
                                </TableCell>
                            </TableRow>
                        ) : (
                            table.getRowModel().rows.map((row) => (
                                <TableRow className="" key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            className="text-center"
                                            key={cell.id}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Card>
            <div className="w-full flex justify-between mt-4">
                <div className="w-[300px]">
                    <Select
                        value={limitValue}
                        onValueChange={(e) => {
                            setLimitValue(e as "15" | "50" | "999");
                            // pagination.pageSize = Number(e);
                            setPagination((prev) => ({
                                ...prev,
                                pageSize: Number(e),
                            }));
                        }}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="15">15 Rows</SelectItem>
                            <SelectItem value="50">50 Rows</SelectItem>
                            <SelectItem value="999">All data</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="size-8"
                        onClick={() => table.previousPage()}
                        disabled={isFetching || !table.getCanPreviousPage()}
                    >
                        <ArrowLeft className="size-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="size-8"
                        onClick={() => table.nextPage()}
                        disabled={isFetching || !table.getCanNextPage()}
                    >
                        <ArrowRight className="size-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default WaitlistDataTable;
