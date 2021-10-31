import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import db from "../firebase";
import { auth } from "../firebase";

const Detail = (props) => {
  const { id } = useParams();
  const [detailData, setDetailData] = useState({});
  const history = useHistory();
  const uid = auth.currentUser.uid;
  const [isStarred, setIsStarred] = useState(false);

  useEffect(() => {
    db.collection("movies")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setDetailData(doc.data());
        } else {
          console.log("no such document in firebase");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

    db.collection("users")
      .doc(uid)
      .collection(id)
      .get()
      .then((doc) => {
        doc.docs.map((document) => {
          if (document.exists) {
            setIsStarred(true);
          } else {
            setIsStarred(false);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleStar = async () => {
    if (!isStarred) {
      await db
        .collection("users")
        .doc(uid)
        .collection(id)
        .add({
          uid,
          ...detailData,
          isStarred: true,
        });
    } else {
      const doc = await db.collection("users").doc(uid).collection(id).get();
      doc.docs.map((d) => {
        if(d.exists) {
          d.ref.delete();
        }
      })
    }
    setIsStarred(!isStarred);
  };

  return (
    <Container>
      <Background>
        <img alt={detailData.title} src={detailData.cardImg} />
      </Background>

      <ImageTitle>{detailData.title}</ImageTitle>
      <ContentMeta>
        <Controls>
          <Explore
            onClick={() =>
              history.push({
                pathname: `/explore-experiment/${detailData.id}`,
                state: { expUrl: detailData.expUrl },
              })
            }
          >
            <img src="/images/explore-icon.png" alt="explore" />
            <span>Explore</span>
          </Explore>
          <Starred onClick={handleStar}>
            <img
              src={!isStarred ? "/images/star.png" : "/images/star-filled.png"}
              alt="star"
            />
            <span>{!isStarred? "Star": "Starred"}</span>
          </Starred>
        </Controls>
        <SubTitle>{detailData.subTitle}</SubTitle>
        <Description>Learning Goals: {detailData.desc}</Description>
      </ContentMeta>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  min-height: calc(100vh-250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
`;

const Background = styled.div`
  left: 0px;
  opacity: 0.8;
  position: fixed;
  right: 0px;
  top: 0px;
  z-index: -1;

  img {
    width: 100vw;
    height: 100vh;
    background-position: center;

    @media (max-width: 768px) {
      width: initial;
    }
  }
`;

const ImageTitle = styled.h1`
  align-items: flex-end;
  display: flex;
  -webkit-box-pack: start;
  justify-content: flex-start;
  margin: 0px auto;
  height: 30vw;
  font-size: 5rem;
  width: 100%;
`;

const ContentMeta = styled.div`
  max-width: 874px;
`;

const Controls = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  margin: 24px 0px;
  min-height: 56px;
`;

const Explore = styled.button`
  font-size: 15px;
  margin: 0px 22px 0px 0px;
  padding: 0px 24px;
  height: 56px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1.8px;
  text-align: center;
  text-transform: uppercase;
  background: rgb (249, 249, 249);
  border: none;
  color: rgb(0, 0, 0);

  img {
    width: 32px;
  }

  &:hover {
    background: rgb(198, 198, 198);
  }

  @media (max-width: 768px) {
    height: 45px;
    padding: 0px 12px;
    font-size: 12px;
    margin: 0px 10px 0px 0px;

    img {
      width: 25px;
      margin-right: 4px;
    }
  }
`;

const Starred = styled.div`
  font-size: 15px;
  margin: 0px 22px 0px 0px;
  padding: 0px 24px;
  height: 56px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1.8px;
  text-align: center;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  color: rgb(0, 0, 0);

  img {
    width: 20px;
    margin-right: 4px;
  }

  &:hover {
    background: rgb(198, 198, 198);
  }

  @media (max-width: 768px) {
    height: 45px;
    padding: 0px 12px;
    font-size: 12px;
    margin: 0px 10px 0px 0px;

    img {
      width: 25px;
    }
  }
`;

const SubTitle = styled.div`
  color: rgb(249, 249, 249);
  font-size: 15px;
  min-height: 20px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Description = styled.div`
  line-height: 1.4;
  font-size: 18px;
  padding: 16px 0px;
  color: rgb(249, 249, 249);

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export default Detail;
