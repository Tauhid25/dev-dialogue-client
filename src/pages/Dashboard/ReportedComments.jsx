import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getReportedComments, handleReportAction } from '../../services/api'
import Loading from '../Loading/Loading'

const ReportedComments = () => {
  const queryClient = useQueryClient()

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ['reportedComments'],
    queryFn: getReportedComments,
  })

  const mutation = useMutation({
    mutationFn: ({ reportId, action }) => handleReportAction(reportId, action),
    onSuccess: () => {
      queryClient.invalidateQueries(['reportedComments'])
    },
  })

  const handleActionChange = (reportId, action) => {
    if (!action) return
    mutation.mutate({ reportId, action })
  }

  return (
    <div className="p-6 bg-white max-w-6xl mx-auto rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Reported Comments</h2>

      {isLoading ? (
       <Loading></Loading>
      ) : reports.length === 0 ? (
        <p className="text-gray-500">No reports available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2 border">Commenter</th>
                <th className="px-4 py-2 border">Comment</th>
                <th className="px-4 py-2 border">Feedback</th>
                <th className="px-4 py-2 border">Reported At</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report._id} className="border-b">
                  <td className="px-4 py-2 border">{report.commenterEmail}</td>
                  <td className="px-4 py-2 border">
                    {report.comment.length > 20
                      ? report.comment.slice(0, 20) + '...'
                      : report.comment}
                  </td>
                  <td className="px-4 py-2 border">{report.feedback}</td>
                  <td className="px-4 py-2 border">
                    {new Date(report.reportedAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border">
                    <select
                      className="border px-2 py-1 rounded"
                      onChange={(e) =>
                        handleActionChange(report._id, e.target.value)
                      }
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select action
                      </option>
                      <option value="ignore">Ignore</option>
                      <option value="warn">Warn User</option>
                      <option value="delete">Delete Comment</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ReportedComments

