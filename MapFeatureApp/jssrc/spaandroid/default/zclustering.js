//Type your code here
var distance = 6371; // Some large number
var _clusters = [];
var oldZoomLevel = undefined;
/*************************************************************************
 *	Name	:	setCluster
 *	Author	 :	 Kony
 *	Purpose	:	To set the cluster and initialize the clustering with zoomlevel 15
 ***********************************************************************/
function setCluster(records) {
    kony.print("records: " + JSON.stringify(records));
    oldZoomLevel = 15;
    if (records == undefined || records == null) {
        alert("please provide kony map standard pin list!");
        return;
    }
    _clusters = records;
}
/*************************************************************************
 *	Name	:	setNodes
 *	Author	 :	 Kony
 *	Purpose	:	To set the nodes on the basis of zoom level.
 ***********************************************************************/
function setNodes(currentZoomLevel) {
    var mapCluster;
    if (oldZoomLevel == undefined) {
        //alert("create cluster first");
        return;
    }
    if (currentZoomLevel < oldZoomLevel) {
        _clusters = mergeCluster(_clusters, currentZoomLevel);
        oldZoomLevel = currentZoomLevel;
    } else if (currentZoomLevel > oldZoomLevel) {
        _clusters = splitCluster(_clusters, currentZoomLevel);
        oldZoomLevel = currentZoomLevel;
    } else {
        kony.print("No change in zoom level");
    }
    kony.print("_clusters :" + JSON.stringify(_clusters));
    return _clusters;
}
/*************************************************************************
 *	Name	:	mergeCluster
 *	Author	 :	 Kony
 *	Purpose	:	To merge the cluster on the basis of zoom level.
 ***********************************************************************/
function mergeCluster(clusters, zoomLevel) {
    var level_distance = zconstant(distance, zoomLevel);
    var clusterAtZoomLevel = _merge(clusters, level_distance);
    kony.print("clusterAtZoomLevel: " + JSON.stringify(clusterAtZoomLevel));
    _clusters = clusterAtZoomLevel;
    return clusterAtZoomLevel;
}
/*************************************************************************
 *	Name	:	splitCluster
 *	Author	 :	 Kony
 *	Purpose	:	To split  the cluster on the basis of zoom level.
 ***********************************************************************/
function splitCluster(clusters, currentZoomLevel) {
    var _clusters = [];
    var new_cluster;
    var level_distance = zconstant(distance, currentZoomLevel);
    for (var i = 0; i < clusters.length; i++) {
        if (clusters[i]["_clusters"] == undefined) {
            _clusters.push(clusters[i]);
            continue;
        }
        new_cluster = _merge(clusters[i]["_clusters"], level_distance);
        kony.print("\nclusters[i]['_clusters'] " + JSON.stringify(clusters[i]["_clusters"]));
        kony.print("\nnew_cluster " + JSON.stringify(new_cluster));
        for (var j = 0; j < new_cluster.length; j++) {
            _clusters.push(new_cluster[j]);
        }
        //_clusters.concat(new_cluster);
    }
    return _clusters;
}
/*************************************************************************
 *	Name	:	_merge
 *	Author	 :	 Kony
 *	Purpose	:	To merge the cluster on the basis of level distance.
 ***********************************************************************/
function _merge(clusters, level_distance) {
    var _clusters = [];
    var nodeI, nodeJ;
    var node_distance;
    var length = clusters.length;
    var found = false;
    for (var i = 0; i < length; i++) {
        found = false;
        var new_cluster = {
            "merged": false
        };
        nodeI = clusters[i];
        if (nodeI.merged == true) {
            nodeI.merged = false;
            continue;
        }
        _merge_node(new_cluster, nodeI);
        //kony.print
        for (var j = i + 1; j < length; j++) {
            nodeJ = clusters[j];
            if (nodeJ.merged == true) {
                continue;
            }
            node_distance = getDistanceBetweenPoints(nodeI, nodeJ);
            kony.print("\nnode distance: " + node_distance);
            kony.print("\nlevel distance: " + level_distance);
            if (node_distance <= level_distance) {
                nodeJ.merged = true;
                found = true;
                _merge_node(new_cluster, nodeJ);
            } else {
                kony.print("distance too far");
            }
        }
        if (found == true) _clusters.push(new_cluster);
        else _clusters.push(nodeI);
    }
    return _clusters;
}
/*************************************************************************
 *	Name	:	_merge_node
 *	Author	 :	 Kony
 *	Purpose	:	To merge the nodes with clusters.
 ***********************************************************************/
function _merge_node(cluster, node) {
    var lat, lon, clusters, name, desc, image, merged;
    clusters = cluster._clusters;
    if (clusters == undefined) {
        cluster["lat"] = Number(node["lat"]);
        cluster["lon"] = Number(node["lon"]);
        cluster["name"] = node["name"];
        cluster["desc"] = node["desc"];
        /* if(isNaN(node["desc"])){
          cluster["desc"]=node["desc"];
        }else{

        }*/
        cluster["image"] = node["image"];
        cluster["_clusters"] = [node];
        cluster["merged"] = false;
    } else {
        var length = clusters.length;
        var lat = 0,
            lon = 0;
        for (var i = 0; i < length; i++) {
            lat = lat + Number(clusters[i]["lat"]);
            lon = lon + Number(clusters[i]["lon"]);
        }
        lat = (lat + Number(node["lat"])) / (1 + length);
        lon = (lon + Number(node["lon"])) / (1 + length);
        cluster["lat"] = lat;
        cluster["lon"] = lon;
        cluster["name"] = "group node";
        cluster["showcallout"] = false;
        if (isNaN(cluster["desc"])) {
            if (isNaN(node["desc"])) {
                cluster["desc"] = 2;
            } else {
                cluster["desc"] = 1 + node["desc"];
            }
        } else {
            if (isNaN(node["desc"])) {
                cluster["desc"] = cluster["desc"] + 1;
            } else {
                cluster["desc"] = cluster["desc"] + node["desc"];
            }
        }
        cluster["image"] = node["image"];
        cluster["_clusters"].push(node);
    }
}
/*************************************************************************
 *	Name	:	createClusters
 *	Author	 :	 Kony
 *	Purpose	:	To create clusters for this module
 ***********************************************************************/
function createClusters(response) {
    if (records == undefined || records == null) {
        alert("please enter valid pin list");
        return;
    }
    var records = response.results;
    var _cluster;
    _clusters = [];
    for (var i = 0; i < records.length; i++) {
        _cluster = {};
        _cluster["lat"] = records[i]["geometry"]["location"]["lat"];
        _cluster["lon"] = records[i]["geometry"]["location"]["lng"];
        _cluster["name"] = records[i]["name"];
        _cluster["desc"] = records[i]["vicinity"];
        _cluster["image"] = "pinb.png";
        _cluster["merged"] = false;
        _cluster["id"] = i;
        _cluster["showcallout"] = false;
        _clusters.push(_cluster);
    }
    kony.print("_clusters: " + JSON.stringify(_clusters));
    oldZoomLevel = 15;
}
/*************************************************************************************
 *	Name	:	zconstant
 *	Author	 :	 Kony
 *	Purpose	:	Compute the threshold distance between two points for a particular zoom level.
 ************************************************************************************/
function zconstant(radius, zoomLevel) {
    return 110 * (Math.pow(0.65, zoomLevel)); //+0.0;
}
/*************************************************************************
 *	Name	:	getDistanceBetweenPoints
 *	Author	 :	 Kony
 *	Purpose	:	To compute the distance between two points.
 ***********************************************************************/
function getDistanceBetweenPoints(p1, p2) {
    if (!p1 || !p2) {
        return 0;
    }
    var R = 6371; // Radius of the Earth in km
    var dLat = (p2.lat - p1.lat) * Math.PI / 180;
    var dLon = (p2.lon - p1.lon) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(p1.lat * Math.PI / 180) * Math.cos(p2.lat * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}