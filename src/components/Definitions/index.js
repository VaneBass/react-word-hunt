import React from "react";
import "./style.css";

const Definitions = ({ word, hasMeaning, meanings, category, lightMode }) => {
  return (
    <div className="meanings">
      {/* 当语言是英文时，显示音频 */}
      {meanings[0] && word && category === "en" && (
        <audio
          src={meanings[0].phonetics[0] && meanings[0].phonetics[0].audio}
          style={{
            width: "100%",
            display: "block",
            backgroundColor: "#fff",
            borderRadius: 10,
          }}
          controls
        >
          Your Browser doesn't support audio element.
        </audio>
      )}
      {/* 输入了关键词后渲染 */}
      {word === "" ? (
        <span className="subtitle">Start by typing a word in Search</span>
      ) : hasMeaning ? (
        meanings.map((mean) =>
          mean.meanings.map((item) =>
            item.definitions.map((def, index) => (
              <div
                key={`${index}-${def}`}
                className="single-mean"
                style={{
                  backgroundColor: lightMode ? "#3b5360" : "white",
                  color: lightMode ? "white" : "black",
                }}
              >
                <b>{def.definition}</b>
                <hr style={{ backgroundColor: "black", width: "100%" }} />
                {def.example && (
                  <span>
                    <b>Example: </b>
                    {def.example}
                  </span>
                )}
                {def.synonyms && def.synonyms.length !== 0 && (
                  <span>
                    <b>Synonyms: </b>
                    {def.synonyms.map((s, index, arr) => {
                      let isEnd = index === arr.length - 1;
                      return isEnd ? `${s}` : `${s}, `;
                    })}
                  </span>
                )}
              </div>
            ))
          )
        )
      ) : (
        <span className="subtitle">
          No Result, please ensure you are using the corresponding language of
          the word in search
        </span>
      )}
    </div>
  );
};

export default Definitions;
