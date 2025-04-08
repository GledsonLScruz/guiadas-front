const StarRating = ({ grade }) => {
    return (
      <div style={{ display: 'flex', gap: '4px' }}>
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            style={{
              color: index < grade ? '#facc15' : '#d1d5db',
              fontSize: '16px',
            }}
          >
            ★
          </span>
        ))}
      </div>
    );
  };
  
  const EvaluationCard = ({
    avaliacao
  }) => {
    const { id, userId, professorId, classId, semester, didacticGrade, didacticComment, evalGrade, evalComment, materialGrade, materialComment, createdAt } = avaliacao;
  
  
    return (
      <div style={{ width: '100%', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', boxSizing: 'border-box', textAlign: 'left' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Evaluation #{id}</h2>
        <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '16px' }}>Created at: {new Date(createdAt).toLocaleString()}</p>
  
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '14px' }}>
          <p><strong>User ID:</strong> {userId}</p>
          <p><strong>Professor ID:</strong> {professorId}</p>
          <p><strong>Class ID:</strong> {classId}</p>
          <p><strong>Semester:</strong> {semester}</p>
        </div>
  
        <div style={{ marginTop: '16px' }}>
          <h3 style={{ fontWeight: '600' }}>Didactic Grade</h3>
          <StarRating grade={didacticGrade} />
          <p style={{ fontSize: '14px', color: '#374151', fontStyle: 'italic', marginTop: '4px' }}>
            "{didacticComment}"
          </p>
        </div>
  
        <div style={{ marginTop: '16px' }}>
          <h3 style={{ fontWeight: '600' }}>Evaluation Grade</h3>
          <StarRating grade={evalGrade} />
          <p style={{ fontSize: '14px', color: '#374151', fontStyle: 'italic', marginTop: '4px' }}>
            "{evalComment}"
          </p>
        </div>
  
        <div style={{ marginTop: '16px' }}>
          <h3 style={{ fontWeight: '600' }}>Material Grade</h3>
          <StarRating grade={materialGrade} />
          <p style={{ fontSize: '14px', color: '#374151', fontStyle: 'italic', marginTop: '4px' }}>
            "{materialComment}"
          </p>
        </div>
      </div>
    );
  };

  export default EvaluationCard;
