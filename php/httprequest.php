<?php
class HTTPRequest
{
	private $parames;

	public function __construct( )
	{
		$this->parames = array( );
	}

	// public static public isObject( const &$obj )
	// {
		// return $obj instanceof HTTPRequest;
	// }

	public function clearParames( )
	{
		$this->parames = array( );
	}
	
	public function buildGETParames( )
	{
		foreach( $_GET as $key=>$value )
		{
			$this->parames[$key] = $value;
		}
	}

	public function buildPOSTParames( )
	{
		foreach( $_POST as $key=>$value )
		{
			$this->parames[$key] = $value;
		}
	}

	public function buildParames( )
	{
		$this->clearParames( );
		$this->buildGETParames( );
		$this->buildPOSTParames( );
	}

	public function getParames( )
	{
		return $this->parames;
	}

	public function getParame( $key )
	{
		return $this->parames[$key]; 
	}
}
?>