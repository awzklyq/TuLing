<?php
include_once( 'database.php' );
class ActionBase
{
	private $actions;
	private $link;
	private	$databsaename;
	public function __construct( $actions )
	{
		if ( $actions == null )
			$this->actions = array( );
		else
			$this->actions = $actions;

		$this->link = null;
		$this->databsaename = "";
	}

	public function doActionEval( )
	{
		foreach ( $this->actions as $key=>$value )
		{
			if ( $key == "eval" )
			{
				eval( $value );
				unset( $this->action[$key] );
			}
		}
	}

	public function doActionSQLConnect( )
	{
		$hostname = "";
		$username = "";
		$password = "";
		$this->databsaename = '';

		foreach ( $this->actions as $key=>$value )
		{
			if ( $key == "sqlhost" )
			{
				$hostname = $value;
				unset( $this->action[$key] );
			}
			else if ( $key == "sqluser" )
			{
				$username = $value;
				unset( $this->action[$key] );
			}
			else if ( $key == "sqlpasd" )
			{
				$password = $value;
				unset( $this->actions[$key] );
			}
			else if ( $key == 'sqlname' )
			{
				$this->databsaename = $value;
				unset( $this->action[$key] );
			}
		}

		$this->link = DataBase::s_connect( $hostname, $username, $password );
		if ( $this->link == null )
		{
			die( "connect database ".$this->databsaename." faild !\n" );
			$this->databsaename = "";
		}
		else if ( DataBase::s_select( $this->link, $this->databsaename ) == null )
		{
			//die( "select database ".$this->databsaename." faild !\n" );
			//$this->databsaename = "";
		}
	}

	public function doActionSQLQuery( )
	{
		if ( $this->databsaename == "" || $this->link == null )
			die( "Not connet dabase !\n");

		$result = null;
		foreach ( $this->actions as $key=>$value )
		{
			if ( $key == "sqlcreateclose".$this->databsaename || $key == "sqlinsertclose".$this->databsaename )
			{
				DataBase::s_query( $this->link, $value );
				DataBase::s_close( $this->link );
				$this->databsaename = "";
				unset( $this->action[$key] );
			}
			else if ( $key == "sqlselecteclose".$this->databsaename )
			{
				$result = DataBase::s_getResult( DataBase::s_query( $this->link, $value ) );
				DataBase::s_close( $this->link );
				$this->databsaename = "";
				unset( $this->action[$key] );
			}
			if ( $key == "sqlcreate".$this->databsaename || $key == "sqlinsert".$this->databsaename )
			{
				DataBase::s_query( $this->link, $value );
				unset( $this->action[$key] );
			}
			else if ( $key == "sqlselecte".$this->databsaename )
			{
				$result = DataBase::s_getResult( DataBase::s_query( $this->link, $value ) );
				unset( $this->action[$key] );
			}
		}

		return $result;
	}

	public function doActionSQLClose( )
	{
		if ( $this->databsaename == "" || $this->link == null )
			die( "Not connet dabase !\n");

		foreach ( $this->actions as $key=>$value )
		{
			if ( $key == "sqlclose".$this->databsaename || $key == "sqlinsertclose".$this->databsaename )
			{
				DataBase::s_close( $this->link );
				$this->databsaename = "";
				unset( $this->action[$key] );
			}
		}
	}

	public function clearAction( )
	{
		$this->actions = array( );
	}

	public function bindAction( $actions )
	{
		$this->actions = $actions;
	}
	
}
?>