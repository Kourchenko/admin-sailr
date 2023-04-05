"use client";

import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter, TablePagination, Typography, Link } from "@mui/material";

import MyBadge from "@/app/components/client/badge/MyBadge.js";

export default function FormTable(props) {

    return (
        <TableContainer sx={{ maxHeight: 250 }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {
                            props.columns.map((column) => {
                                return (
                                    <TableCell size="small"
                                        key={`table-header-${column.id}`}
                                        style={{ width: column.width }}
                                    >
                                        <Typography variant="overline">
                                            {column.label}
                                        </Typography>
                                    </TableCell>
                                )
                            })
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.rows.map((row, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell size="small">
                                        <Typography variant="overline">
                                            {row.date}
                                        </Typography>
                                    </TableCell>
                                    <TableCell size="small">
                                        <Typography variant="overline">
                                            {row.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell size="small">
                                        <div>
                                            <MyBadge variant={row.status.toLowerCase().includes("success") ? "success" : "error"} />
                                            <Typography variant="overline">
                                                {row.status}
                                            </Typography>
                                        </div>
                                    </TableCell>
                                    <TableCell size="small">
                                        <Typography variant="overline">
                                            <Link href="/">View Details</Link>
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
                <TableFooter style={{ left: 0, bottom: 0, position: "sticky", zIndex: 2, backgroundColor: "white" }}>
                    <TableRow>
                        <TablePagination
                            colSpan={5}
                            align="right"
                            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                            count={0}
                            rowsPerPage={5}
                            page={0}
                            onPageChange={(newPage) => console.log(newPage)}
                            onRowsPerPageChange={(newRow) => console.log(newRow)}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}