
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { handleDeleteCategory } from "../shared/helpers/editCategory";
function CategoriesPage() {
const categories = useSelector((state)=> state.categories.data)
const [currentPage, setCurrentPage] = useState(1);
const [categoriesPerPage] = useState(4);
const indexOfLastCategory = currentPage * categoriesPerPage;
const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
const currentCategories = categories?.slice(indexOfFirstCategory, indexOfLastCategory);
const paginate = (pageNumber) => setCurrentPage(pageNumber);
return (
<div>
<div className="header1">
    <h1 className="header-title1">Creating a New Category</h1>
    <Link to="/" className="header-button1">Go back</Link>
    </div>
    <>
    <div className="challenges-list">
     {currentCategories.map((category) => (
      <div className="challenge-card" key={category.id}>
        <img className="challenge-image" src={category.photoUrl} alt={category.photoUrl} />
        <h3 className="challenge-name">{category.title}</h3>
        
        <div className="edit-container">
          <div>
            <Link to={`/EditCategory/${category.id}`} className="edit-button">
              Edit
            </Link>
          </div>
          <div>
            <button className="delete-button" onClick={()=>handleDeleteCategory(category.id)} >
              Delete
            </button>
          </div>
        </div>

      </div>
    ))} 
  </div>
  <div className="pagination">
        {Array(Math.ceil(categories.length / categoriesPerPage))
          .fill()
          .map((_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))}
      </div> 
  </>
</div>
)
}

export default CategoriesPage;