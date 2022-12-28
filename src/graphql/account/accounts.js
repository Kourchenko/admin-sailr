import { gql } from '@apollo/client';

const GET_ACCOUNTS = gql`
    query accounts ($limit: Int, $offset: Int) {
        accounts(limit: $limit, offset: $offset) {
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

export default GET_ACCOUNTS;