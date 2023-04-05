import React, {
    useState,
    useEffect
} from "react";

import {
    useQuery,
    useLazyQuery,
    useMutation
} from "@apollo/client";

import {
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableFooter,
    TablePagination,
    TextField
} from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";

import AccountTableRow from "components/account/AccountTableRow";
import GET_ACCOUNTS from "services/graphql/account/accounts";
import CREATE_ACCOUNT from "services/graphql/account/createAccount";
import DELETE_ACCOUNT from "services/graphql/account/deleteAccount";

import "/src/App.css";

export default function AccountsTable() {

    const [dataGridRows, setDataGridRows] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [pageSize, setPageSize] = useState(5);
    const [page, setPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [search, setSearch] = useState("");

    // Get Accounts - On load action.
    const { loading, error } = useQuery(GET_ACCOUNTS, {
        variables: { limit: pageSize, offset: page },
        onCompleted: data => {
            const rows = mapAccountsQuery(data.accounts.accounts);
            setDataGridRows(rows);
            setTotalCount(data.accounts.totalCount);
        }
    });

    // Create Account - On command action.
    const [createAccount, { loading: createLoading }] = useMutation(CREATE_ACCOUNT, {
        onCompleted: data => {
            const newRows = dataGridRows.slice();
            newRows.push(mapAccountQuery(data.createAccount));

            setDataGridRows(newRows);
            setTotalCount(totalCount + 1);
        }
    });

    // Get Accounts - On command action.
    const [getAccounts, { loading: getAccountsLoading }] = useLazyQuery(GET_ACCOUNTS, {
        fetchPolicy: "network-only",
        onCompleted: data => {
            const newRows = mapAccountsQuery(data.accounts.accounts);
            setDataGridRows(newRows);
            setTotalCount(data.accounts.totalCount);
        },
        onError: err => {
            console.log(err);
        }
    });

    // Delete Account
    const [deleteAccount, { loading: deleteLoading }] = useMutation(DELETE_ACCOUNT, {
        onCompleted: data => {
            const newRows = mapAccountsQuery(data.deleteAccount.accounts);
            setDataGridRows(newRows);
            setTotalCount(data.deleteAccount.totalCount);

            if (data.deleteAccount.count < totalCount) {
                var newPage = page - 1 >= 0 ? page - 1 : 0;
                setPage(newPage);
            }
        }
    });

    function handleSearch(e) {
        let searchTerm = e.target.value;
        if (searchTerm !== "") {
            const timeOutId = setTimeout(() => {
                setSearch(searchTerm);
            }, 500);
            return () => clearTimeout(timeOutId);
        } else {
            setSearch("");
        }
    }

    function onDeleteAccount(accountId) {
        deleteAccount({ variables: { accountId: accountId, limit: pageSize, offset: page } })
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setPageSize(event.target.value);
        setPage(0);
    }

    // Map Accounts List.
    const mapAccountsQuery = (accounts) => {
        return accounts.map((account) => {
            return mapAccountQuery(account)
        })
    }

    // Map Account.
    function mapAccountQuery(account) {
        const accountId = account.id;
        const status = account && account.accountHttpStatus ? account.accountHttpStatus.value : 0;
        const reasonPhrase = account && account.accountHttpStatus ? account.accountHttpStatus.reasonPhrase : "Error";
        const name = account.name;
        const url = account.url;

        const mappedAccount = account ?
            {
                "id": accountId,
                "status": status,
                "reasonPhrase": reasonPhrase,
                "name": name,
                "url": url
            }
            : null;

        return mappedAccount;
    }

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            getAccounts({ variables: { limit: pageSize, offset: page } })
        }, 1000);
        return () => clearTimeout(timeOutId);
    }, [createAccount, deleteAccount, page, pageSize]);

    if (error) return `Error! ${error.message}`;

    const columns = [
        { id: "name", label: "Name", width: 200 },
        { id: "url", label: "URL", width: 200 },
        { id: "refresh", label: "", width: 10 },
        { id: "delete", label: "", width: 10 },
    ];

    return (

        <Paper sx={{ width: "75%", overflow: "hidden", margin: "1em auto" }}>
            <TextField fullWidth size="small"
                id="standard-basic" variant="outlined"
                placeholder="Search..."
                defaultValue={search}
                onChange={handleSearch} />
            <TableContainer sx={{ maxHeight: 500, margin: "0 auto" }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => {
                                return (
                                    <TableCell size="small"
                                        key={`table-head-${column.id}`}
                                        style={{ width: column.width }}
                                    >
                                        <strong>{column.label}</strong>
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading || getAccountsLoading ?

                            <TableRow>
                                <TableCell size="small" colSpan={5}>
                                    <CircularProgress size={20} style={{ fontSize: "15px", verticalAlign: "middle", cursor: "pointer" }} />
                                </TableCell>
                            </TableRow>

                            :

                            (dataGridRows.filter((row) => {
                                if (row.name.toLowerCase().includes(search.toLowerCase()) || row.url.toLowerCase().includes(search.toLowerCase())) {
                                    return row;
                                }
                            })
                                .map((row) => {
                                    return (
                                        <AccountTableRow account={row} key={row.id} loading={loading || getAccountsLoading || createLoading || deleteLoading} onDeleteAccount={onDeleteAccount} />
                                    )
                                }
                                ))
                        }
                    </TableBody>
                    <TableFooter style={{ left: 0, bottom: 0, position: "sticky", zIndex: 2, backgroundColor: "white" }}>
                        <TableRow>
                            <TableCell>
                                <LoadingButton size="small" loading={loading || getAccountsLoading || createLoading || deleteLoading} variant="outlined" onClick={() => createAccount({ variables: { name: "", url: "" } })}>Add New</LoadingButton>
                            </TableCell>
                            <TablePagination colSpan={5} align="right"
                                rowsPerPageOptions={[5, 10, 25, { label: "All", value: totalCount }]}
                                count={totalCount}
                                rowsPerPage={pageSize}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Paper>
    )
}