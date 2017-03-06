<?php
    //连接数据库
    function connect () {

        $serverName = "localhost";
        $userName = "root";
        $passWord = "root";
        $DBname = "yjlogin";

        //初始化连接,返回一个连接对象(包含所有连接数据库的信息)
        $con = mysqli_connect($serverName, $userName, $passWord, $DBname);

        //获取并判断连接对象的错误信息
        if(mysqli_connect_error($con)) {
            echo "连接 数据库 失败" . mysqli_connect_error();
            return null;
        }
//        else { echo "connected"; }
        //函数返回连接信息
        return $con;
    };

//    connect();

    //执行查询语句, 返回查询结果
    function query($sql) {

        //获取连接结果信息
        $con = connect();

        //执行 sql 脚本，也叫数据库脚本，返回一个结i果集（对象）
        $result = mysqli_query($con, $sql);

        //定义一个数组, 保存查询结果
        $jsonQuery = array();

        if ($result) {

            //在结果集中获取对象(逐行获取)
            while ($obj = mysqli_fetch_object($result))
            {
                $jsonQuery[] = $obj;
                // print_r($obj->email);
            }

            //将对象转换成 json 格式的字符并打印出来
            //JSON.stringify()
            // if(!$isCheck){
                // echo json_encode($jsonData, JSON_UNESCAPED_UNICODE);
            // }


            // 释放结果集
            mysqli_free_result($result);
        };

        //关闭连接
        mysqli_close($con);
        return $jsonQuery;
    };

    //执行逻辑语句
    function excute($sql) {

        //初始化连接
        $con = connect();

        //执行 sql 脚本, 也叫数据库脚本
        //返回一个布尔值，true|false，不用释放
        $result = mysqli_query($con, $sql);

        //关闭连接
        mysqli_close($con);
        return $result;

    }

    //查询语句，只是呈现结果，不改变数据
    //返回一个结果集，存放在内存当中，用完要释放

    //逻辑语句，改变数据
    //insert into, update, delete // 返回一个布尔值，true|false，不用释放
?>