import { gql } from "@apollo/client";

const DELETE_ACCOUNT = gql`
    mutation deleteAccount($accountId: ID!, $limit: Int, $offset: Int) {
        deleteAccount(accountId: $accountId, limit: $limit, offset: $offset) {
            accounts {
                id,
                name,
                url,
                accountHttpStatus {
                    is2xxSuccessful,
                    value,
                    reasonPhrase
                }
            },
            count,
            totalCount,
            page,
            totalPages
        }
    }
`;

export default DELETE_ACCOUNT;