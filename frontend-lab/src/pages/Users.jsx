import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button.jsx';
import { Card } from '../components/ui/Card.jsx';
import { useUsers } from '../hooks/useUsers.js';
import { useUiStore } from '../store/ui.js';

export default function Users() {
  const { data: users, isPending, isError, error, refetch, isFetching } = useUsers();
  const view = useUiStore((state) => state.view);
  const search = useUiStore((state) => state.search);
  const setView = useUiStore((state) => state.setView);
  const setSearch = useUiStore((state) => state.setSearch);

  if (isPending) return <p role="status">Loading users…</p>;
  if (isError) return <p role="alert">Failed: {error.message} <Button onClick={refetch}>Retry</Button></p>;

  const filteredUsers = users.filter((user) => {
    const query = search.toLowerCase();
    return user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query);
  });

  return (
    <>
      {isFetching && <small>Refreshing…</small>}

      <div className="mb-6 flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-muted">Search users</span>
          <input
            className="rounded-card border border-line bg-surface px-3 py-2"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Name or email"
          />
        </label>
        <div className="flex gap-2">
          <Button type="button" variant={view === 'grid' ? 'primary' : 'ghost'} onClick={() => setView('grid')}>
            Grid
          </Button>
          <Button type="button" variant={view === 'list' ? 'primary' : 'ghost'} onClick={() => setView('list')}>
            List
          </Button>
        </div>
      </div>

      {filteredUsers.length === 0 && <p role="status">No users match “{search}”.</p>}
      <ul className={view === 'grid' ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3' : 'grid gap-3'}>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            <Card>
              <h2 className="font-semibold">{user.name}</h2>
              <p className="text-muted">{user.email}</p>
              <Link className="mt-3 inline-block text-primary hover:underline" to={`/users/${user.id}`}>
                View details
              </Link>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}