export const updateQuestion = async (mapId, questionColumnId, questionId, questionContent) => {
    const response = await fetch(`http://localhost:3800/api/question/${questionId}`, {
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

    const response = await fetch(`http://localhost:3800/api/question/${questionColumnId}`, {
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
