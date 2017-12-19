// Transform{x, y, scx, scy, skx, sky}
function Bone( name, pname, transform )
{
	this.name = name || "";
	this.parentName = pname || "";
	this.parent = null;
	// this.transform = {x:0.00, y:0.00, skX:0.0000, skY:0.0000, scX:1.0000, scY:1.0000 };
	this.transform = new Matrix( );

	this.root = false;
	// if ( transform != null )
	// {
		// this.transform.x = transform.x || 0.00;
		// this.transform.y = transform.y || 0.00;
		// this.transform.skX = transform.skX || 0.00;
		// this.transform.skY = transform.skY || 0.00;
		// this.transform.scX = transform.scX || 1.00;
		// this.transform.scY = transform.scY || 1.00;
	// }

	if ( transform != null )
	{
		this.transform.mulRotationXYLeft( transform.skX || 0.00, transform.skY || 0.00 );
		this.transform.mulScalingLeft( transform.scX || 1.00, transform.scY || 1.00 );
		this.transform.mulTranslationRight( transform.x || 0.00, transform.y || 0.00 );
	}

	this.addChild = function( bone )
	{
		if ( this.childs == null )
			this.childs = new ArrayEx( )

		this.childs.push( bone );
	}

	this.getChilds = function( ) 
	{
		return this.childs
	}
}

function Bones( data )
{
	this.relations = { };

	this.relativetransforms = {}
	this.checkParent = function( bone )
	{
		var temp1 = new Matrix( );
		var temp2 = new Matrix( );
		for ( let i = 0; i < this.bones.length; i ++ )
		{
			if ( bone.parentName == this.bones[i].name )
			{
				temp1.set( this.bones[i].transform.mat );
				temp1.inverse( );
				bone.parent = this.bones[i];

				temp2.set( bone.transform.mat );
				this.relations[bone.name] = bone.parentName;
				temp2.mulRight( temp1 );

				var mat = new Matrix( );
				mat.set( bone.transform.mat );
				this.relativetransforms[bone.name] = mat;

				// TODO.
				bone.transform.mulRight( this.bones[i].transform );
				this.bones[i].addChild( bone );
				break;
			}
		}
	}

	this.getRelativeTransformByName = function(name)
	{
		return this.relativetransforms[name];
	}

	this.getRelationTable = function( )
	{
		return this.relations;
	}

	this.bones = new ArrayEx( );

	if ( Global.isArray( data ) == false )
		return;

	this.bonesHelper = {};
	for ( let i = 0; i < data.length; i ++ )
	{
		var bone = new Bone( data[i].name, data[i].parent, data[i].transform );

		if ( i == 0 )
		{
			bone.root = true;
			this.root = bone;
		}

		this.checkParent( bone );

		this.bones.push( bone );

		this.bonesHelper[bone.name] = this.bones.length - 1;
	}

	this.getBoneByName = function( name )
	{
		var index = this.bonesHelper[name];
		return Global.isNumber(index) ? this.bones[index] : null;
	}
}

function Slot( )
{
	// 插槽名称.
	this.name = "";

	// 插槽所属的骨骼名称.
	this.parentBone = "";

	// 默认显示对象的索引 (可选属性 默认: 0).
    this.displayIndex = 0;

	//混合模式 (可选属性 默认: null).
	this.blendMode = null;

	this.color = {
		aM: 100, // 透明叠加 [0~100] (可选属性 默认: 100)
		rM: 100, // 红色叠加 [0~100] (可选属性 默认: 100)
		gM: 100, // 绿色叠加 [0~100] (可选属性 默认: 100)
		bM: 100, // 蓝色叠加 [0~100] (可选属性 默认: 100)
		aO: 0.00, // 透明偏移 [-255~255] (可选属性 默认: 0)
		rO: 0.00, // 红色偏移 [-255~255] (可选属性 默认: 0)
		gO: 0.00, // 绿色偏移 [-255~255] (可选属性 默认: 0)
		bO: 0.00, // 蓝色偏移 [-255~255] (可选属性 默认: 0)
	};

	// 添加到舞台后的行为列表 (可选属性 默认: null)
	// this.actions
}

function Slots( data )
{
	this.slots = new ArrayEx( );
	this.slotsHelper = {};

	this.setSlots = function( data )
	{
		this.slots.clear( );

		if ( this.slotsHelper )
			delete this.slotsHelper;

		this.slotsHelper = {};

		if ( Global.isArray( data ) == false )
			return;

		for ( let i = 0; i < data.length; i ++ )
		{
			var slot = new Slot( );
			slot.name = data[i].name;
			slot.parentBone = data[i].parent;
			slot.displayIndex = data[i].displayIndex;
			slot.blendMode = data[i].blendMode;
			slot.color.aM = data[i].color.aM || 100;
			slot.color.rM = data[i].color.rM || 100;
			slot.color.gM = data[i].color.gM || 100;
			slot.color.bM = data[i].color.bM || 100;
			slot.color.aO = data[i].color.aO || 0;
			slot.color.rO = data[i].color.rO || 0;
			slot.color.gO = data[i].color.gO || 0;
			slot.color.bO = data[i].color.bO || 0;
			this.slots.push( slot );

			this.slotsHelper[slot.name] = this.slots.length - 1;
		}
	}

	this.getSlotByName = function( name )
	{
		var index = this.slotsHelper[name];
		return Global.isNumber(index) ? this.slots[index] : null;
	}

 	this.getDataLength = function( )
 	{
 		return this.slots.length
 	}

 	this.getByIndex = function( index )
 	{
 		return this.slots[index]
 	}

	this.setSlots(data);
}

function Display( )
{
	// 显示对象名称.
	this.name = "";

	// 显示对象类型 (可选属性 默认: "image")
    // ["image": 贴图, "armature": 骨架, "mesh": 网格, "boundingBox": 包围盒, ... 其他扩展的类型]
    this.type = "image";

	// 子骨架指向的骨架名、网格包含的贴图名 (可选属性 默认: null, 仅对子骨架、网格有效)
	this.path = null;

	// 共享网格的索引 (可选属性 默认: null, 仅对网格有效)
	this.share = null;

	// 是否继承动画 (可选属性 默认: true, 仅对共享网格有效).
	this.inheritFFD = true;
 
	// 包围盒类型 (可选属性 默认: "rectangle", 仅对包围盒有效)
	// ["rectangle": 矩形, "ellipse": 椭圆, "polygon": 自定义多边形]
	this.subType = "rectangle";

	// 显示对象颜色 (可选属性 默认: 0, 仅对包围盒有效).
	this.color = 0;

	// 显示对象相对于骨骼的位移/ 斜切/ 缩放 (可选属性 默认: null).
	// this.transform = {x:0.00, y:0.00, skX:0.0000, skY:0.0000, scX:1.0000, scY:1.0000 };
	// this.transform = {x:0.00, y:0.00, skX:0.0000, skY:0.0000, scX:1.0000, scY:1.0000 };
	this.transform = new Matrix( );
	// 显示对象的轴点 (可选属性 默认: null, 对骨架无效).
	this.pivot = {x : 0.50, y: 0.50 };

	this.width = 100;
	this.height = 100;
}

function Displays( data )
{
	this.displays = new ArrayEx( );
	this.setDisplays = function( data )
	{
		this.displays.clear( );

		if ( Global.isArray( data ) == false )
			return;

		for ( let i = 0; i < data.length; i ++ )
		{
			let display = new Display( );
			display.name = data[i].name;
			display.type = data[i].type;
			display.path = data[i].path;
			display.subType = data[i].subType;
			display.color = data[i].color;

			display.width = data[i].width || 100;
			display.height = data[i].height || 100;
		
			// display.transform = new Matrix( );
			// if ( data[i].transform != null )
			// {
				// display.transform.x = data[i].transform.x || 0.00;
				// display.transform.y = data[i].transform.y || 0.00;
				// display.transform.skX = data[i].transform.skX || 0.00;
				// display.transform.skY = data[i].transform.skY || 0.00;
				// display.transform.scX = data[i].transform.scX || 1.00;
				// display.transform.scY = data[i].transform.scY || 1.00;
			// }

			if ( data[i].transform != null )
			{
				display.transform.mulRotationXYLeft( data[i].transform.skX || 0.00, data[i].transform.skY || 0.00 );
				display.transform.mulScalingLeft( data[i].transform.scX || 1.00, data[i].transform.scY || 1.00 );
				display.transform.mulTranslationRight( data[i].transform.x || 0.00, data[i].transform.y || 0.00 );

			}

			this.displays.push( display );
		}
	}

	this.setDisplays( data );
}

function SkinSlot( )
{
	// 插槽名称.
	this.name = "";

	// 此插槽包含的显示对象列表.
	this.displays = null; 

	this.setDisPlays = function( data )
	{		
		if ( this.displays != null )
			delete this.displays;

		this.displays = new Displays( data );
	}
}

function SkinSlots( data )
{
	this.skinSlots = new ArrayEx( );

	this.setSlots = function( data )
	{
		this.skinSlots.clear( );

		if ( Global.isArray( data ) == false )
			return;

		for ( let i = 0; i < data.length; i ++ )
		{
			var skinslot = new SkinSlot( );
			skinslot.name = data[i].name;
			skinslot.setDisPlays( data[i].display );
			skinslot.displays.name = skinslot.name; //TODO.
			this.skinSlots.push(skinslot);
		}
	}

	this.setSlots( data );
}

function Skin( )
{
	// 皮肤名称.
	this.name = "";

	// 此皮肤包含的插槽列表.
	this.slots = null;

	this.setSlots = function( data )
	{
		if ( this.slots != null )
			delete this.slots;

		this.slots = new SkinSlots( data ); 
	}
}

function Skins( data )
{
	this.skins = new ArrayEx( );

	this.setSkins = function( data )
	{
		this.skins.clear( );

		if ( Global.isArray( data ) == false )
			return;
		
		for ( let i = 0; i < data.length; i ++ )
		{
			var skin = new Skin( );
			skin.name = data[i].name;
			skin.setSlots( data[i].slot );
			this.skins.push( skin );
		}
	}

	this.linkDatas = new ArrayEx( );
	this.linkData = function( bslots, bones, textures )
	{
		this.linkDatas.clear( );
		for ( let i = 0; i < this.skins.length; i ++ )
		{
			let skin = this.skins[i];
			let slots = skin.slots;
			if ( slots != null )
			{
				let skinslots = slots.skinSlots;
				for ( let j = 0; j < skinslots.length; j ++ )
				{
					let solt = bslots.getSlotByName( skinslots[j].name );
					let bone = bones.getBoneByName( solt.parentBone );

					// if ( skinslots[i].slot != null )
						// delete skinslots[i].slot;

					// skinslots[i].slot = solt;

					// 绑定到skin slot上的bone.
					if ( skinslots[j].bone != null )
						delete skinslots[j].bone;

					skinslots[j].bone = bone;

					let displays = skinslots[j].displays != null ? skinslots[j].displays.displays : null;
					if ( displays != null )
					{
						for ( let k = 0; k < displays.length; k ++ )
						{
							if ( displays[k].type != 'image' )
								continue;

							if ( displays[k].texture != null )
								delete displays[k].texture;

							// 绑定到skin slot displays上的texture.
							displays[k].texture = textures.findSubTexture( displays[k].name );
						}
					}
				}
			}
		}
	}

	this.setSkins( data );
}

function AnimationFrame( data )
{
	// 帧长度 (可选属性 默认: 1)
	this.duration = data.duration;

	// 帧声音 (可选属性 默认: null)
	this.sound = data.sound;

	// 帧事件列表 (可选属性 默认: null)
	this.events = new ArrayEx( );
	for ( let i = 0; i < data.events.length; i ++ )
	{
		var temp = data.events[i];
		var event = {};
		event.name = temp.name;
		event.bone = temp.bone;

		// 需要拷貝.
		// 插槽名称 (可选属性 默认: null)
		event.slot = temp.slot;

		// 事件参数列表 (可选属性 默认: null)
		event.floats = temp.floats;
		event.strings = temp.strings;
		this.events.push( event );
	}

	if ( data.actions != null )
	{
		this.gotoAndPlay = data.actions.gotoAndPlay;
		this.gotoAndStop = data.actions.gotoAndStop;
	}
}

function AnimationBone( data )
{
	// 时间轴名称 (与骨骼名称对应)
	this.name = data.name;

	// 时间轴缩放 (可选属性 默认: 1.00)
	this.scale = data.scale;

	// 时间轴偏移 (可选属性 默认: 0.00)
	this.offset = data.offset;

	// 此时间轴包含的关键帧列表 (可选属性 默认: null)
	this.frames = new ArrayEx( );
	if ( data.frame != null )
	{
		for ( let i = 0; i < data.frame.length; i ++ )
		{
			var temp = { };
			var frame = data.frame[i];
			 // 帧长度 (可选属性 默认: 1)
			temp.duration = frame.duration;
			temp.time = i == 0 ? 0 : this.frames[this.frames.length - 1].duration + this.frames[this.frames.length - 1].time;

			//frame.time = temp.time;
			// 缓动类型 [0: 由 tweenEasing 或 curve 描述缓动类型，1~N: 其他扩展缓动类型枚举（具体如何枚举未来再定义）] (可选属性 默认: 0)
			temp.tweenType = frame.tweenType;

			// 缓动值 [0.00: 线性, null: 无缓动] (可选属性 默认: null
			temp.tweenEasing = frame.tweenEasing;

			// 贝塞尔曲线缓动参数列表 [x1, y1, x2, y2, ...] (可选属性 默认: null)
			temp.curve = frame.curve;

			var transform = frame.transform;
			temp.transform = new Matrix( );

			if ( transform != null )
			{
				temp.transform.mulRotationXYLeft( transform.skX || 0.00, transform.skY || 0.00 );
				temp.transform.mulScalingLeft( transform.scX || 1.00, transform.scY || 1.00 );
				temp.transform.mulTranslationRight( transform.x || 0.00, transform.y || 0.00 );
			}

			this.frames.push( temp );
		}
	}

	this.getCurrentBoneMatrix = function( tick )
	{
		return this.getFrameByTick( tick ).transform;
	}

	this.getBoneByFrame = function( index )
	{
		if ( index >= this.frames.length )
			return;

		return this.frames[index]
	}

	this.getFrameByTick = function( tick )
	{
		var start = 0;
		var end = this.frames.length - 1;

		if ( tick >= this.frames[end].time )
			return this.frames[end];

		if ( tick <= this.frames[start].time )
			return this.frames[start];

		if ( arguments.length == 3 )
		{
			start = arguments[1];
			end = arguments[2];
		}

		if ( start >= end )
			return this.frames[end]

		var index = Math.floor( ( start + end ) * 0.5 );

		if ( tick < this.frames[index].time )
		{
			return this.getFrameByTick( tick, start, index)
		}
		else
		{
			if ( tick >= this.frames[index].time && tick < this.frames[index].time + this.frames[index].duration )
				return this.frames[index]
			else
				return this.getFrameByTick( tick, index + 1, end )
		}
	}

	this.getFrameLenth= function( )
	{
		return this.frames.length
	}
}

function AnimationSlot( data )
{
	// 时间轴名称 (与插槽名称对应)
	this.name = data.name;

	// 此时间轴包含的关键帧列表 (可选属性 默认: null)
	this.frames = new ArrayEx( );
	if ( data.frame != null )
	{
		for ( let i = 0; i < data.frame.length; i ++ )
		{
			var temp = { };
			var frame = data.frame[i];

			 // 帧长度 (可选属性 默认: 1)
			temp.duration = frame.duration;

			temp.time = i == 0 ? temp.duration : temp.duration + data.frame[i - 1].time;

			// 缓动类型 [0: 由 tweenEasing 描述缓动类型，N: 其他扩展缓动属性] (可选属性 默认: 0)
			temp.tweenType = frame.tweenType;

			// 缓动值 [0.00: 线性, null: 无缓动] (可选属性 默认: null
			temp.tweenEasing = frame.tweenEasing;

			// 贝塞尔曲线缓动参数列表 [x1, y1, x2, y2, ...] (可选属性 默认: null)
			temp.curve = frame.curve;

			// 此帧的显示对象索引 (皮肤中对应的插槽显示对象列表) (可选属性 默认: 0)
            temp.displayIndex = frame.displayIndex;

            temp.color = {}
            temp.color.aM = frame.color.aM || 100;
			temp.color.rM = frame.color.rM || 100;
			temp.color.gM = frame.color.gM || 100;
			temp.color.bM = frame.color.bM || 100;
			temp.color.aO = frame.color.aO || 0;
			temp.color.rO = frame.color.rO || 0;
			temp.color.gO = frame.color.gO || 0;
			temp.color.bO = frame.color.bO || 0;

			// 播放到当前帧时，执行的动作行为列表 (可选属性 默认: null)

			if ( frame.actions != null )
			{
				this.gotoAndPlay = frame.actions.gotoAndPlay;
				this.gotoAndStop = frame.actions.gotoAndStop;
			}

			this.frames.push( temp );

		}
	}
}

function Animation( data )
{
	this.tick = 0;
	this.pause = false;

	this.name = data.name;
	this.zOrder = new ArrayEx( );
	if ( data.zOrder != null && data.zOrder.frame != null )
	{
		var frames = data.zOrder.frame;
		for ( let i = 0; i < frames.length; i ++ )
		{
            //duration:帧长度 (可选属性 默认: 1)
            //zOrder[0, 2, 4, 1, 6, -1]:插槽偏移 [slotIndexA, offsetA, slotIndexB, offsetB, ...] (可选属性 默认: null)
            this.zOrder.push( {duration:frames[i].duration, zOrder:frames[i].zOrder} );
		}
	}

	this.playTimes = data.playTimes;
	this.duration = data.duration;

	// 此动画包含的关键帧列表 (可选属性 默认: null)
	this.frames = new ArrayEx( );
	if ( data.frame != null )
	{
		for ( let i = 0; i < data.frame.length; i ++ )
			this.frames.push( new AnimationFrame( data.frame[i] ) );
	}

	// 此动画包含的骨骼时间轴列表 (可选属性 默认: null)
	this.bones = { };
	if ( data.bone != null )
	{
		for ( let i = 0; i < data.bone.length; i ++ )
			this.bones[data.bone[i].name] = new AnimationBone( data.bone[i] );
	}

	this.getBones = function( )
	{
		return this.bones;
	}

	 // 此动画包含的插槽时间轴列表
	this.slots = { };
	if ( data.slot != null )
	{
		for ( let i = 0; i < data.slot.length; i ++ )
			this.slots[data.slot[i].name] = new AnimationBone( data.slot[i] );
	}

	this.getCurrentBoneMatrix = function( name )
	{
		var bone = this.bones[name];
		if ( bone != null )
			return bone.getCurrentBoneMatrix( this.tick );

		return new Matrix( );
	}

	this.stop = function( )
	{
		this.tick = 0;
		this.pause = true;
	}

	this.play = function( )
	{
		this.tick = 0;
		this.pause = false;
	}

	this.resetBoneMatrix = function( pbone, pbones )
	{
		var bone = this.bones[pbone.name]
		if ( bone == null )
			return;

		if ( pbone.name == 'root' )
		{

		}

		var childs = pbone.getChilds( );
		if ( childs == null || childs.length == 0 )
			return;

		for ( let i = 0; i < childs.length; i ++ )
		{
			var cbone = this.bones[childs[i].name];
			if ( cbone == null )
				continue;

			var flen = cbone.getFrameLenth( );
			for ( let j = 0; j < flen; j ++ )
			{
				var cframe = cbone.getBoneByFrame( j );
				var frame = bone.getFrameByTick( cframe.time );
				if ( frame == null || cframe == null )
					break;

				var mat = new Matrix( );
				mat.set( pbones.getRelativeTransformByName( childs[i].name ) )
				mat.mulLeft( cframe.transform );
				mat.mulRight( frame.transform );
				cframe.transform.set( mat );
			}

			this.resetBoneMatrix( childs[i], pbones );
		}
	}

	this.bindBones = function( pbones )
	{
		// 必須有root.
		if ( this.bones['root'] == null )
			return;

		var rootbone = pbones.getBoneByName( 'root' );
		if ( rootbone == null )
			return;

		this.resetBoneMatrix( rootbone, pbones );


	}

	this.update = function( e )
	{
		if ( this.pause )
			return;

		this.tick += 0.1;
		if ( this.tick > this.duration )
			this.tick = 0;

	}
}

function Animations( data )
{
	this.animatios = { };
	for ( let i= 0; i < data.length; i ++ )
	{
		this.animatios[data[i].name] = new Animation( data[i]);
	}

	this.getAnimaByName = function( name )
	{
		return this.animatios[name];
	}

	this.getAnimas = function( )
	{
		return this.animatios;
	}

	this.bindBones = function( bones )
	{
		for ( let v in this.animatios )
			this.animatios[v].bindBones( bones );
	}

}

function Armature( data )
{
	// 骨架名称.
	this.name = '';

	this.transform = new Matrix( );
	this.transform.mat[6] = 400;
	this.transform.mat[7] = 400;
	// 动画帧频 (可选属性 默认: 使用全局帧频).
	this.frameRate = 24;

	// ["Armature": 骨骼动画, "MovieClip": 基本动画, "Stage": 场景动画]
   //  this.frameRate = '';

	  // 添加到舞台后的默认行为列表 (可选属性 默认: null)
	 //this.defaultActions = 

	// 此骨架包含的骨骼列表.
	this.bones = new Bones( data != null ? data.bone : null );

	// 此骨架包含的插槽列表.
	this.slots = new Slots( data != null ? data.slot : null );

	// 此骨架包含的皮肤列表.
	this.skins = new Skins( data != null ? data.skin : null );

	// 此骨架包含的 ik 约束列表.
	//this.ik =

	// 此骨架包含的动画列表.
	this.animations = new Animations( data != null ? data.animation : null );

	this.animations.bindBones( this.bones );
	this.currentAnima = this.animations.getAnimaByName( 'walk' );
	this.currentAnima.play();
	// this.currentAnima = null;

	var length = this.slots.getDataLength();
	this.renderunits = new ArrayEx( );
	this.renderunitshelper = { }; //优化计算的.
	for ( let i = 0; i < length; i ++ )
	{
		var slot = this.slots.getByIndex(i)
		if ( slot != null )
		{
			this.renderunits.push( { name:slot.name, datas:new ArrayEx( ) });
			this.renderunitshelper[slot.name] = this.renderunits[this.renderunits.length - 1];
		}
	}

	this.linkData = function( textures )
	{
		this.skins.linkData( this.slots, this.bones, textures );
	}

	this.update = function( e )
	{
		if ( this.currentAnima != null )
		{
			this.currentAnima.update( e )
		}
	}

	this.render = function( )
	{
		var index = 0;
		var skins = this.skins.skins;
		Global.pushMatrix( this.transform );
		for ( let i = 0; i < skins.length; i ++ )
		{
			let slots = skins[i].slots == null ? null : skins[i].slots.skinSlots;

			if ( slots == null ) continue;

			for ( let j = 0; j < slots.length; j ++ )
			{
				index = 0;
				var displays = slots[j].displays == null ? null : slots[j].displays.displays;
				if ( displays == null ) continue;

				if ( slots[j].bone )
				{
					if ( this.currentAnima != null )
						Global.pushMatrix( this.currentAnima.getCurrentBoneMatrix( slots[j].bone.name ) );
					else
						Global.pushMatrix( slots[j].bone.transform );
				}

				for ( let k = 0; k < displays.length; k ++ )
				{
					if ( displays[k].texture != null )
					{
						index ++;
						var data = this.renderunitshelper[slots[j].name].datas[index]
						if ( data == null )
						{
							data = { mat:new Matrix( ) };
							this.renderunitshelper[slots[j].name].datas.push( data );
						}
						Global.pushMatrix( displays[k].transform );
						//var image = displays[k].texture.image

						data.mat.set( Global.getCurrentMatrix( ).mat );
						data.image = displays[k].texture.image
						//image.drawImage( -image.getWidth( ) * 0.5, -image.getHeight( ) * 0.5 );
						Global.popMatrix( );
					}
						
				}

				if ( slots[j].bone )
				{
					Global.popMatrix( );
				}
			}
		}

		Global.popMatrix( );

		for ( let i = 0; i < this.renderunits.length; i ++ )
		{
			for ( let j = 1; j < this.renderunits[i].datas.length; j ++ )
			{
				Global.pushMatrix( this.renderunits[i].datas[j].mat );
				var image = this.renderunits[i].datas[j].image;
				image.drawImage( -image.getWidth( ) * 0.5, -image.getHeight( ) * 0.5 );
				Global.popMatrix( );
			}
		}
	}
}

DragonBoneEx = { };

DragonBoneEx.loadBoneDataFromJson = function( )
{
}

// Dragonbone sub texture.
function DSubTexture( )
{
	this.name = "";
	this.frameX = 0;
	this.frameY = 0;
	this.frameWidth = 0;
	this.frameHeight = 0;

	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;

	this.image = new LImage( );
}

function DTexture( data )
{
	this.setSubTextures = function( data )
	{
		this.subTextures.clear( );

		if ( Global.isArray( data ) == false )
			return;

		for ( let i = 0; i < data.length; i ++ )
		{
			var subtexture = new DSubTexture( );
			subtexture.name = data[i].name;
			subtexture.frameX = data[i].frameX || 0;
			subtexture.frameY = data[i].frameY || 0;
			subtexture.frameWidth = data[i].frameWidth || 0;
			subtexture.frameHeight =data[i].frameHeight || 0;

			subtexture.x = data[i].x || 0;
			subtexture.y = data[i].y || 0;
			subtexture.width = data[i].width || 0;
			subtexture.height = data[i].height || 0;
			subtexture.image.addResource( this.image, subtexture.x , subtexture.y, subtexture.width, subtexture.height );
			this.subTextures.push(subtexture);
		}
	}

	this.subTextures = new ArrayEx( );

	this.findSubTexture = function( name )
	{
		for ( let i = 0; i < this.subTextures.length; i ++ )
		{
			if ( this.subTextures[i].name == name )
				return this.subTextures[i];
		}

		return null;
	}

	if ( Global.isObject( data ) )
	{
		this.name = data.name || "";
		this.imagePath = data.imagePath || "";
		this.width = data.width || 0;
		this.height = data.height || 0;
		this.image = new LImage( this.imagePath );
		this.setSubTextures( data.SubTexture );
	}
	else
	{
		this.name = "";
		this.imagePath = "";
		this.width = 0;
		this.height = 0;
		this.image = new LImage( );
	}
}

DragonBoneEx.loadSke = function( json )
{
	var armature = new Armature( json['armature'][0] );
	return armature;
}

DragonBoneEx.loadTex = function( json )
{
	var texture = new DTexture( json );
	return texture;
} 