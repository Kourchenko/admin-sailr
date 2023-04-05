import { gql } from "@apollo/client";

const GET_ACCOUNT_BY_ID = gql`
    query account ($accountId: ID!) {
        account(accountId: $accountId) {
            id,
            name,
            url,
            accountHttpStatus {
                is2xxSuccessful,
                value,
                reasonPhrase
            }
        }
    }
`;

export default GET_ACCOUNT_BY_ID;