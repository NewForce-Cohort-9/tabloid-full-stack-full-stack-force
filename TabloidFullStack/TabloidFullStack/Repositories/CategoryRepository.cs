using Microsoft.Data.SqlClient;
using TabloidFullStack.Models;
using TabloidFullStack.Utils;
namespace TabloidFullStack.Repositories
{
    public class CategoryRepository : BaseRepository, ICategoryRepository
    {
        public CategoryRepository(IConfiguration config) : base(config) { }

        public List<Category> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT id, name FROM Category ORDER BY name Asc";
                    var reader = cmd.ExecuteReader();

                    var categories = new List<Category>();

                    while (reader.Read())
                    {
                        categories.Add(new Category()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("name")),
                        });
                    }

                    reader.Close();

                    return categories;
                }
            }
        }
        public Category GetById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                {
                    conn.Open();

                    using (SqlCommand cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"SELECT Name, Id FROM Category WHERE Id = @id";

                        DbUtils.AddParameter(cmd, "@id", id);

                        SqlDataReader reader = cmd.ExecuteReader();

                        if (reader.Read())
                        {
                            Category category = new Category
                            {
                                Id = id,
                                Name = DbUtils.GetString(reader, "Name")
                            };
                            reader.Close();
                            return category;

                        }
                        reader.Close();
                        return null;
                    }
                }
            }
        }
        public void AddCategory(Category category)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Category (Name) OUTPUT INSERTED.ID VALUES (@name)";

                    DbUtils.AddParameter(cmd, "@name", category.Name);

                    int id = (int)cmd.ExecuteScalar();

                    category.Id = id;
                }
            }
        }
        public void UpdateCategory(Category category)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                               UPDATE Category
                               SET 
                                Name = @name
                               WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@name", category.Name);
                    DbUtils.AddParameter(cmd, "@id", category.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteCategory(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Category WHERE Id = @id";

                   DbUtils.AddParameter(cmd, "@id", id);
                   cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
