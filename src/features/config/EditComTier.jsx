export default function EditComTier({ comTier }) {
  return (
    <div>
      <div>
        <table className="w-full text-center">
          <thead>
            <tr>
              <th>Tier Level</th>
              <th>Rate Start</th>
              <th>Percent</th>
            </tr>
          </thead>
          <tbody>
            {comTier.map((item, index) => (
              <tr key={index}>
                <td>{item.tierLevel}</td>
                <td>{item.rateStart}</td>
                <td>{item.percent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div></div>
    </div>
  );
}
