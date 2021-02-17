<?php

namespace App\Repositories;

use App\Repositories\RepositoryInterface;

abstract class BaseRepository implements RepositoryInterface
{
  // Impact to current model
  protected $model;

  // Init model
  public function __construct()
  {
    $this->setModel();
  }

  // Return current model
  abstract public function getModel();

  // Set model
  public function setModel()
  {
    $this->model = app()->make(
      $this->getModel()
    );
  }

  // Return query all
  public function getAll()
  {
    return $this->model->all();
  }

  // Return single item
  public function find($id)
  {
    $result = $this->model->find($id);
    return $result;
  }

  // Create a new item
  public function create($attributes = [])
  {
    return $this->model->create($attributes);
  }

  // Update atts of current item
  public function update($id, $attributes = [])
  {
    $result = $this->find($id);
    if ($result) {
      $result->update($attributes);
      return $result;
    }

    return false;
  }

  // Delete current item
  public function delete($id)
  {
    $result = $this->find($id);
    if ($result) {
      $result->delete();
      return true;
    }
    return false;
  }
}
