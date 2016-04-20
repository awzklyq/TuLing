<?php
class DataBase
{
	private $link = null;
	private $db = null;

	// public static public isObject( const &$obj )
	// {
		// return $obj instanceof DataBase;
	// }

	public static function s_connect( $hostname, $username, $password )
	{
		return mysql_connect( $hostname, $username, $password );
	}

	public static function s_select( $link, $databasename )
	{
		if ( $link == null )
		{
			die( "$link is null, so con't select db! \n" );
			return false;
		}

		if( ! mysql_select_db( $databasename,  $link ) )
		{
			die( " con't select db! \n" );
			return false;
		}

		echo"连接数据库 ".$databasename." 成功！<br>";
		return true;
	}

	public static function s_query( $link, $sql )
	{
		if ( $link == null )
		{
			die( "function s_query can't doing,  $link == null \n" );
			return;
		}

		return mysql_query( $sql, $link );
	}

	public static function s_close( &$link )
	{
		if ( $link == null  ) 
			return;

		mysql_close( $link );
	}

	public static function s_getResult( $result )
	{
		return mysql_fetch_array( $result );
	}

	public function connect( $hostname, $username, $password )
	{
		$this->link = mysql_connect( $hostname, $username, $password );
		if ( $this->link == null )
		{
			die( "无法连接服务器 ：".mysql_errno( ) );
			return false;
		}

		echo"连接数据库服务器 ".$hostname." 成功！<br>";
		return true;
	}

	public function select( $databasename )
	{
		if ( $this->link == null ) 
			return;

		$this->db = mysql_select_db( $databasename, $this->link );
		if ( !$this->db )
		{
			die( "无法连接服务器 ：".mysql_errno( ) );
			return false;
		}

		echo"连接数据库 ".$hostname." 成功！<br>";
		return true;
	}

	public function query( $sql )
	{
		if ( $this->link == null ) 
			return;

		return mysql_query( $sql, $this->link );
	}

	public function close( )
	{
		if ( $this->link == null ) 
			return;

		mysql_close( $this->link );
		unset( $this->link );
	}
}
?>