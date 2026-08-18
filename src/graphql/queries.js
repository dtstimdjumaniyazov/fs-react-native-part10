import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
    query Repository(
        $orderBy: AllRepositoriesOrderBy
        $orderDirection: OrderDirection
        $searchKeyword: String
    ) {
        repositories(
            orderBy: $orderBy
            orderDirection: $orderDirection
            searchKeyword: $searchKeyword
        ) {
            edges {
                node {
                    createdAt
                    description
                    forksCount
                    id
                    language
                    name
                    ownerAvatarUrl
                    ownerName
                    ratingAverage
                    reviewCount
                    stargazersCount
                }
            }
        }
    }
`

export const GET_REPOSITORY = gql`
    query Repository($id: ID!) {
        repository(id: $id) {
            id
            fullName
            description
            forksCount
            language
            ownerAvatarUrl
            ratingAverage
            reviewCount
            stargazersCount
            url
            reviews {
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        user {
                            id
                            username
                        }
                    }
                }
            }
        }
    }
`

export const AUTHENTICATE = gql`
    mutation authenticate(
        $username: String!
        $password: String!
    ) {
        authenticate(credentials: {
            username: $username, password: $password
        }) {
            accessToken
        }
    }
`

export const CREATE_REVIEW = gql`
    mutation createReview($review: CreateReviewInput) {
        createReview(review: $review) {
            id
            repositoryId
        }
    }
`

export const DELETE_REVIEW = gql`
    mutation deleteReview($id: ID!) {
        deleteReview(id: $id)
    }
`

export const CREATE_USER = gql`
    mutation createUser($user: CreateUserInput) {
        createUser(user: $user) {
            id
            username
        }
    }
`

export const ME = gql`
    query getCurrentUser($includeReviews: Boolean = false) {
        me {
            id
            username
            reviews @include(if: $includeReviews) {
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        repository {
                            id
                            fullName
                        }
                    }
                }
            }
        }
    }
`