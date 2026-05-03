import { useAuth } from '../contexts/AuthContext';

function Profile() {
  const { user } = useAuth();

  return (
    <section className="form-page">
      <div className="form-card">
        <h1>Profile</h1>
        {user ? (
          <>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </>
        ) : (
          <p>No user is currently logged in.</p>
        )}
      </div>
    </section>
  );
}

export default Profile;