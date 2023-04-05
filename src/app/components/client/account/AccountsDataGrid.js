import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import LoadingButton from "@mui/lab/LoadingButton";
import Divider from "@mui/material/Divider";

import GET_ACCOUNTS from "services/graphql/account/accounts";
import GET_ACCOUNT_BY_ID from "raphql/account/account";
import CREATE_ACCOUNT from "services/graphql/account/createAccount";
import DELETE_ACCOUNT from "services/graphql/account/deleteAccount";


export default function AccountsDataGrid() {

    const [dataGridRows, setDataGridRows] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const [page, setPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            getAccounts({ variables: { limit: pageSize, offset: page } })
        }, 1000);
        return () => clearTimeout(timeOutId);
    }, [dataGridRows]);

    const columns = [

        { field: "name", headerName: "Name", flex: 0.4, editable: true },
        { field: "url", headerName: "URL", flex: 0.4, editable: true },
        {
            field: "refresh",
            headerName: "REFRESH",
            sortable: false,
            filterable: false,
            flex: 0.2,
            renderCell: (params) => (
                <LoadingButton variant="outlined" loading={loading || deleteLoading} onClick={() => getAccount({ variables: { accountId: params.id } })}>Refresh</LoadingButton>
            )
        },
        {
            field: "delete",
            headerName: "DELETE",
            sortable: false,
            filterable: false,
            flex: 0.2,
            renderCell: (params) => (
                <LoadingButton color="error" variant="outlined" loading={loading || deleteLoading} onClick={() => deleteAccount({ variables: { accountId: params.id, limit: pageSize, offset: page } })}>Delete</LoadingButton>
            )
        }
    ];

    // Get Accounts - On load action.
    const { loading } = useQuery(GET_ACCOUNTS, {
        variables: { limit: pageSize, offset: page },
        onCompleted: data => {
            const rows = mapAccountsQuery(data.accounts.accounts);
            setDataGridRows(rows);
            setTotalCount(data.accounts.totalCount);
        }
    });

    // Create Account - On command action.
    const [createAccount] = useMutation(CREATE_ACCOUNT, {
        onCompleted: data => {
            const newRows = dataGridRows.slice();
            newRows.push(mapAccountQuery(data.createAccount));

            setDataGridRows(newRows);
            setTotalCount(totalCount + 1);
        }
    });

    // Get Accounts - On command action.
    const [getAccounts] = useLazyQuery(GET_ACCOUNTS, {
        fetchPolicy: "no-cache", // Prevents Caching
        onCompleted: data => {
            const newRows = mapAccountsQuery(data.accounts.accounts);
            setDataGridRows(newRows);
            setTotalCount(data.accounts.totalCount);
        }
    });

    // Get Accounts - On command action.
    const [getAccount] = useLazyQuery(GET_ACCOUNT_BY_ID, {
        onCompleted: data => {
            const account = mapAccountQuery(data.account);
            dataGridRows.map(obj => dataGridRows.find(o => o.id === obj.id) || obj);
            var updatedDataGridRows = dataGridRows.map(ac => ac.id === account.id ? account : ac);
            console.log(updatedDataGridRows);
            setDataGridRows(updatedDataGridRows);
        }
    });

    // Delete Account
    const [deleteAccount, { loading: deleteLoading }] = useMutation(DELETE_ACCOUNT, {

        onCompleted: data => {
            const newRows = mapAccountsQuery(data.deleteAccount.accounts);
            setDataGridRows(newRows);
            setTotalCount(data.deleteAccount.totalCount);
        }
    });

    // Map Accounts List.
    const mapAccountsQuery = (accounts) => {
        return accounts.map((account) => mapAccountQuery(account))
    }

    // Map Account.
    function mapAccountQuery(account) {
        const accountId = account.id;
        const status = account && account.accountHttpStatus ? account.accountHttpStatus.value : 0;
        const reasonPhrase = account && account.accountHttpStatus ? account.accountHttpStatus.reasonPhrase : "Error";
        const name = account.name;
        const url = account.url;

        return account ?
            {
                "id": accountId,
                "status": status,
                "reasonPhrase": reasonPhrase,
                "name": name,
                "url": url
            }
            : null;
    }

    return (
        <Box sx={{ height: 400, width: "75%", margin: "0 auto" }}>
            <Stack direction="row" spacing={1} sx={{ mb: 1 }} divider={<Divider orientation="vertical" flexItem />}>
                <LoadingButton variant="outlined" color="primary" loading={loading || deleteLoading} onClick={() => createAccount({ variables: { name: "", url: "" } })}>Add Row</LoadingButton>
            </Stack>
            <DataGrid
                disableSelectionOnClick
                page={page}
                onPageChange={(newPage) => setPage(newPage)}
                rows={dataGridRows}
                columns={columns}
                pageSize={pageSize}
                onPageSizeChange={(pageSize) => setPageSize(pageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                loading={loading || deleteLoading}
                pagination
                paginationMode="server"
                rowCount={totalCount}
            />
        </Box>
    );
}