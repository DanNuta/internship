import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createPortal } from "react-dom";

import { getsUsers } from "../../../../api";
import { Button, Modal } from "../../../../components";
import { Table, UserModalForm } from "../../components";
import { UserProps } from "../../../../types";

import "./style.scss";

export const Users = () => {
  const [addUser, setAddUser] = useState(false);

  const { data, isLoading } = useQuery<UserProps[]>({
    queryKey: ["users"],
    queryFn: getsUsers,
  });

  return (
    <div className="users">
      {isLoading && <h1>Loading...</h1>}

      {addUser &&
        createPortal(
          <Modal onCancel={() => setAddUser((prev) => !prev)}>
            <UserModalForm />
          </Modal>,
          document.body
        )}

      <div className="users__header">
        <h1>Utilizatori</h1>

        <div>
          <Button onClick={() => setAddUser((prev) => !prev)}>
            Adauga utilizator
          </Button>
        </div>
      </div>

      <div className="list_users">
        <div className="card_row">
          <span>Nume</span>
          <span>Prenume</span>
          <span>Email</span>
          <span>Gen</span>
          <span>Rol</span>
          <span>Action</span>
        </div>

        {data &&
          data.map((item, i) => {
            return <Table key={i} user={item} />;
          })}
      </div>
    </div>
  );
};
