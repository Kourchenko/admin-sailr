import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";

import CircularProgress from "@mui/material/CircularProgress";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import LoadingButton from "@mui/lab/LoadingButton";
import Tooltip from "@mui/material/Tooltip";

import GET_ACCOUNT_BY_ID from "services/graphql/account/account";
import UPDATE_ACCOUNT from "services/graphql/account/updateAccount";

import MyBadge from "badge/MyBadge";

export default function AccountTableRow(props) {

    const [rowData, setRowData] = useState(props.account);
    const [name, setName] = useState(props.account.name);
    const [url, setUrl] = useState(props.account.url);

    // Query Account
    const [getAccount, { loading: accountLoading }] = useLazyQuery(GET_ACCOUNT_BY_ID, {
        fetchPolicy: "network-only", // Prevents Caching
        onCompleted: data => setRowData(mapAccountQuery(data.account))
    });

    // Update Account
    const [updateAccount] = useMutation(UPDATE_ACCOUNT, {
        fetchPolicy: "network-only", // Prevents Caching
        onCompleted: data => setRowData(mapAccountQuery(data.updateAccount))
    });

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

    function status() {
        if (accountLoading || props.deleteLoading) {
            return "processing";
        } else {
            if ([200].includes(rowData.status)) return "success";
            else if ([400].includes(rowData.status)) return "error";
            else return "";
        }

    }

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            const newRow = structuredClone(rowData);

            if (rowData.name !== name) {
                newRow.name = name;
            }
            if (rowData.url !== url) {
                newRow.url = url;
            }
            updateAccount({ variables: { accountId: newRow.id, name: newRow.name, url: newRow.url } })
        }, 1000);
        return () => clearTimeout(timeOutId);

    }, [name, url]);

    return (
        <TableRow tabIndex={-1} key={`table-body-row-${rowData.id}`}>

            {/* ======================== NAME ======================== */}
            <TableCell size="none" align="center" style={{ padding: 15 }}>
                <TextField
                    id="standard-basic" variant="standard" fullWidth size="small"
                    defaultValue={rowData.name}
                    onChange={e => setName(e.target.value)}
                    inputProps={{
                        style: {
                            padding: 0
                        }
                    }}
                    InputProps={{
                        disableUnderline: true,
                        startAdornment: (
                            <InputAdornment position="start" onClick={() => getAccount({ variables: { accountId: rowData.id } })}>
                                {accountLoading || props.deleteLoading || rowData.url === "" ?
                                    <CircularProgress size={12} style={{ padding: 0, fontSize: "15px", verticalAlign: "middle", cursor: "pointer" }} />
                                    :
                                    <Tooltip title={rowData.status + " - " + rowData.reasonPhrase}>
                                        <div>
                                            <MyBadge variant={status()} />
                                        </div>
                                    </Tooltip>
                                }
                            </InputAdornment>
                        )
                    }} />
            </TableCell>


            {/* ======================== URL ======================== */}
            <TableCell size="none" align="center" style={{ padding: 15 }}>
                <TextField
                    id="standard-basic" variant="standard" fullWidth size="small"
                    defaultValue={rowData.url}
                    onChange={e => setUrl(e.target.value)}
                    InputProps={{
                        disableUnderline: true
                    }} />
            </TableCell>

            {/* ======================== REFRESH ======================== */}
            <TableCell size="none" align="center" style={{ padding: 5 }}>
                <LoadingButton size="small" loading={accountLoading || props.loading} onClick={() => getAccount({ variables: { accountId: rowData.id } })} variant="outlined">Refresh</LoadingButton>
            </TableCell>

            {/* ======================== DELETE ======================== */}
            <TableCell size="none" align="center" style={{ padding: 5 }}>
                <LoadingButton color="error" size="small" loading={accountLoading || props.loading} onClick={() => props.onDeleteAccount(rowData.id)} variant="outlined">Delete</LoadingButton>
            </TableCell>
        </TableRow>
    )
}