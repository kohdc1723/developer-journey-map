export const updateQuestion = async (mapId, questionColumnId, questionId, questionContent) => {
    const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/question/${questionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        mapId: mapId,
        questionColumnId: questionColumnId,
        questionContent: questionContent
      })
    });

    await response.json();
};

export const createQuestion = async (mapId, questionColumnId) => {
    const defaultQuestionContent = "New question";

    const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/question/${questionColumnId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mapId: mapId,
            questionContent: defaultQuestionContent
        })
    });

    const jsonResponse = await response.json();
    
    return jsonResponse.result;
};

export const deleteQuestion = async (mapId, questionColumnId, questionId) => {
    const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/question/${questionId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mapId: mapId,
            questionColumnId: questionColumnId
        })
    });

    await response.json();
};