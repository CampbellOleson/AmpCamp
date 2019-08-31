import gql from "graphql-tag";

const FETCH_USERS = gql`
  {
    users {
      _id
      username
      email
      date
    }
  }
`;

<Query query={FETCH_USERS}>
  {({ loading, error, data }) => {
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
    return (
      <ul>
        {data.users.map(user => (
          <li key={user._id}>
            {user.username}
            {user.email}
            {user.date}
          </li>
        ))}
      </ul>
    );
  }}
</Query>;
