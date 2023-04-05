import { gql } from "@apollo/client";

const CREATE_ACCOUNT = gql`
    mutation createAccount ($accountId: ID, $name: String, $url: String) {
        createAccount(account: {
            id: $accountId,
            name: $name,
            url: $url
        }) {
            id,
            name,
            url
        }
    }
`;

export default CREATE_ACCOUNT;