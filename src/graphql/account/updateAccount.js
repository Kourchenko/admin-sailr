import { gql } from '@apollo/client';

const UPDATE_ACCOUNT = gql`
    mutation updateAccount ($accountId: ID!, $name: String, $url: String) {
        updateAccount(account: {
            id: $accountId,
            name: $name,
            url: $url
        }) {
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

export default UPDATE_ACCOUNT;