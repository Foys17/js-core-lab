// 1. Child Component (Props receive korche)
function UserCard(props) {
  return (
    <div style={{ border: "1px solid gray", padding: "10px", margin: "10px 0" }}>
      <h3>Name: {props.name}</h3>
      <p>Role: {props.role}</p>
    </div>
  );
}

// 2. Parent Component (Data pathacche)
function App() {
  return (
    <div>
      <h1>User Directory</h1>
      {/* Props pass kora hocche */}
      <UserCard name="Foysal" role="Backend Engineer" />
      <UserCard name="Rahim" role="Frontend Developer" />
    </div>
  );
}

export default App;