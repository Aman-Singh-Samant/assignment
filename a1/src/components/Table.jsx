import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

const Table = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      axios.get('https://assignment-api-five.vercel.app/api/auth/get')
      .then(users => setUsers(users.data))
      .catch(err => console.log(err))
    },[])

    let i = users.length

    return (
      <div>
        <div>
          <table className="p- table ">
            <thead>
              <tr className="decoration-2">
                <th className="table_heading">Action</th>
                <th className="table_heading">ID</th>
                <th className="table_heading">Start Date</th>
                <th className="table_heading">End Date</th>
                <th className="table_heading">Month,Year</th>
                <th className="table_heading">Dates Excluded</th>
                <th className="table_heading">Number Of Days</th>
                <th className="table_heading">Lead Count</th>
                <th className="table_heading">Expected DRR</th>
                <th className="table_heading">Last Update</th>
              </tr>
            </thead>
            <tbody >
              {users.slice(0).reverse().map((user) => {
                return (
                  <tr className="table_row " key={user._id}>
                    <td className="table_content" cite="Action : "></td>
                    <td className="table_content" cite="ID : ">
                      {i--}
                    </td>
                    <td className="table_content" cite="Start Date : ">
                      {user.startDate}
                    </td>
                    <td className="table_content" cite="End Date : ">
                      {user.endDate}
                    </td>
                    <td className="table_content" cite="Month,Year : ">
                      {user.startDate.slice(0, 2)}
                    </td>
                    <td className="table_content" cite="Dates Excluded : ">
                      {user.excludeDates.split(",").map((str)=> <p>{str}</p>)}
                    </td>
                    <td className="table_content" cite="Number of Days : ">
                      {user.numberOfDays}
                    </td>
                    <td className="table_content" cite="Lead Count">
                      {user.leadCount}
                    </td>
                    <td className="table_content" cite="Expected DRR">
                      {parseInt(user.expDRR)}
                    </td>
                    <td className="table_content" cite="Last update">
                      {dayjs(user.createdAt).format("MM/DD/YYYY")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
      </div>
    );
};

export default Table;
