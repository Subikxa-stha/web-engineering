import { Link, useParams } from 'react-router-dom';
import { Card } from '../components/ui/Card.jsx';
import { Button } from '../components/ui/Button.jsx';
import { useUser } from '../hooks/useUsers.js';

export default function UserDetail() {
  const { id } = useParams();
  const { data: user, isPending, isError, error, refetch, isFetching } = useUser(id);

  if (isPending) return <p role="status">Loading user…</p>;
  if (isError) {
    return (
      <p role="alert">
        Failed: {error.message}{' '}
        <Button onClick={refetch}>Retry</Button>
      </p>
    );
  }

  return (
    <Card>
      {isFetching && <small>Refreshing…</small>}
      <h1 className="mb-2 text-2xl font-bold">{user.name}</h1>
      <p className="text-muted">{user.email}</p>
      {user.phone && <p className="mt-2">Phone: {user.phone}</p>}
      {user.website && <p>Website: {user.website}</p>}
      <Link className="mt-4 inline-block text-primary hover:underline" to="/users">Back to users</Link>
    </Card>
  );
}