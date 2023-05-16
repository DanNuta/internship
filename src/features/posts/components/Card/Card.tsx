import { Link } from "react-router-dom";

import { PostProps } from "@/types";
import { DeleteImage, EditImage } from "@/icons";
import { Button } from "@/components/Button/Button";
import { navigateToPost } from "@/routes";

interface CardProps {
  data: PostProps;
  onDeletePost: (id: number) => void;
}

export const Card: React.FC<CardProps> = ({ data, onDeletePost }) => {
  const lengthDescription = data.description?.length > 100 ? "..." : "";

  return (
    <div className="card">
      <div className="image-container">
        <img className="image-container__image" src={data.linkImage} />

        <div className="image-container__btns">
          <Button
            type="neutral"
            element="img"
            dimension="default"
            onClick={() => onDeletePost(data.id)}
          >
            <DeleteImage />
          </Button>

          <Button type="neutral" element="img" dimension="default">
            <Link to={navigateToPost.gotoPostEdit(data.id)}>
              <EditImage />
            </Link>
          </Button>
        </div>
      </div>

      <Link to={navigateToPost.gotoPostDetails(data.id)}>
        <div className="body">
          <div className="body__title">
            <div className="body__title-edit">
              <h1 className="body__title-post">{data.title}</h1>
            </div>
            <p className="body__date">{data.date}</p>
          </div>

          <div className="body__description">
            <p className="body__desc--title">
              {data.description?.slice(0, 100)}
              {lengthDescription}
            </p>
          </div>

          <div>
            <p className="body__author--label">
              Author:
              <span className="body__author--info">
                {data.author.name} {data.author.prenume}
              </span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};