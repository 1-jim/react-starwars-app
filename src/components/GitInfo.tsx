import axios from "axios";
import { useState, useEffect } from "react";
import { GitUser } from "../models/gitUser";
import { MessageBar, MessageBarType } from "@fluentui/react";

function GitInfo(): JSX.Element {
  const [data, setData] = useState<GitUser>();
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://api.github.com/users/1-jim");
        const gitUser: GitUser = res.data;
        setData(gitUser);
      } catch (e) {
        console.error(e);
        setError(e);
      }
      finally{
        setLoading(false);
      }
    };
    void fetchData();
  }, []);

  if (loading) return <h1>loading</h1>;

  if (error)
    return (
      <MessageBar
        messageBarType={MessageBarType.error}
        dismissButtonAriaLabel="close"
        isMultiline={true}
      >
        {JSON.stringify(error)}
      </MessageBar>
    );

  if (!data) return <h1>No Git Data!</h1>;

  if (data)
    return (
      <>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        <div>
          <h2>{data.name}</h2>
          <img
            src={data.avatar_url}
            height={100}
            alt={"User Avatar for " + data.name}
          />
          <h2>{data.login}</h2>
          <h3>{data.created_at}</h3>
        </div>
      </>
    );

  return <h1>Data</h1>;
}

export default GitInfo;
