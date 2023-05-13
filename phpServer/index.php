<?php

include("./connection.php");
$db = new dbObj();
$connection =  $db->getConnstring();
$request_method=$_SERVER["REQUEST_METHOD"];
//which method

switch($request_method)
{
  case 'GET':
   // GET with id
   if(!empty($_GET["id"]))
   {
    $id=intval($_GET["id"]);
    getMovieById($id);
   }
   else
   {
    //  error_log("getMovies called!", 0);
     getMovies(); //all movies
   }
   break;

 case 'POST':
  // Insert new movie with POST
  createMovie();
  break;

 case 'PUT':
   // Update an movie (with id) and PUT method
   updateMovie();
   break;
   
 case 'DELETE':
   // Delete an movie with ID, DELETE method
   $id=intval($_GET["id"]);
   deleteMovie($id);
   break;

 default:
  // Invalid Request Method
    header("HTTP/1.0 405 Method Not Allowed");
    break;
} 



function getMovies()
{
  global $connection;
  $query="SELECT * FROM movies";
  $response=array();
  $result=mysqli_query($connection, $query);
  while($row=mysqli_fetch_assoc($result))
  {
    $response[]=$row;
  }
  header('Content-Type: application/json'); //send the header
  echo json_encode($response); //data in JSON format
}

function getMovieById($id)
{
  global $connection;
  $query="SELECT * FROM movies WHERE id=".$id." LIMIT 1"; //get movie with a given id
  $result = mysqli_query($connection, $query);
  $movie = mysqli_fetch_assoc($result);
  header('Content-Type: application/json'); //header
  echo json_encode($movie); //in JSON format
}

function createMovie()
 {
  global $connection;
   
    $data = json_decode(file_get_contents('php://input'), true); //getting data from the client
    $title=$data["title"]; //separate them
    $description=$data["description"];
    $cast=$data["cast"];
    $query="INSERT INTO movies SET title='".$title."', description='".$description."', cast='".$cast."'";
    if(mysqli_query($connection, $query))
    {
       $response=array(
             'status' => 1,
             'status_message' =>'movie Added Successfully.'
              );
    }
    else
    {
       $response=array(
             'status' => 0,
             'status_message' =>'movie Addition Failed.'
             );
    }
    header('Content-Type: application/json');
    echo json_encode($response); //response with header 
  }
  
function deleteMovie($id)
{
   global $connection;
  $query="DELETE FROM movies WHERE id=".$id;
   if(mysqli_query($connection, $query))
   {
     $response=array(
      'status' => 1,
       'status_message' =>'movie Deleted Successfully.'
      );
   }
   else
   {
      $response=array(
         'status' => 0,
         'status_message' =>'movie Deletion Failed.'
      );
   }
   header('Content-Type: application/json');
   echo json_encode($response);
}
                  

function updateMovie()
 {
   global $connection;
   $data = json_decode(file_get_contents("php://input"),true);
   $id=$data["id"];
   $title=$data["title"];
   $description=$data["description"];
   $cast=$data["cast"];
   $query="UPDATE movies SET title='".$title."', description='".$description."', cast='".$cast."'  WHERE id=".$id;
   if(mysqli_query($connection, $query))
   {
      $response=array(
         'status' => 1,
         'status_message' =>'movie Updated Successfully.'
      );
    }
    else
    {
        $response=array(
            'status' => 0,
           'status_message' =>'movie Updation Failed.'
        );
    }
    header('Content-Type: application/json');
    echo json_encode($response);
}                  
         
?>